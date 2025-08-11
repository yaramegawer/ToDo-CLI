const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const tasksFile = 'tasks.json';

const readTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(tasksFile);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return []; 
    }
};

const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(tasksFile, dataJSON);
};

const getNextId = (tasks) => {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map(task => task.id)) + 1;
};

const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
};

const displayTasks = (tasks) => {
    if (tasks.length === 0) {
        console.log('No tasks available.');
        return;
    }
    
    console.log('\n📋 Task List:');
    console.log('─'.repeat(80));
    
    tasks.forEach((task) => {
        const status = task.completed ? '✅' : '⏳';
        const priority = task.priority ? ` [${task.priority.toUpperCase()}]` : '';
        const tags = task.tags && task.tags.length > 0 ? ` #${task.tags.join(' #')}` : '';
        const timestamp = formatTimestamp(task.createdAt);
        
        console.log(`${status} ${task.id}. ${task.description}${priority}${tags}`);
        console.log(`   Created: ${timestamp}`);
        if (task.completed) {
            console.log(`   Completed: ${formatTimestamp(task.completedAt)}`);
        }
        console.log('');
    });
};

const argv = yargs(hideBin(process.argv))
    .command('add <description>', 'Add a new task', (yargs) => {
        return yargs
            .positional('description', {
                describe: 'Task description',
                type: 'string',
                demandOption: true
            })
            .option('priority', {
                alias: 'p',
                describe: 'Task priority (low, medium, high)',
                type: 'string',
                choices: ['low', 'medium', 'high']
            })
            .option('tags', {
                alias: 't',
                describe: 'Comma-separated tags for the task',
                type: 'string'
            });
    }, (argv) => {
        const tasks = readTasks();
        const newTask = {
            id: getNextId(tasks),
            description: argv.description,
            completed: false,
            createdAt: new Date().toISOString(),
            priority: argv.priority || 'medium',
            tags: argv.tags ? argv.tags.split(',').map(tag => tag.trim()) : []
        };
        
        tasks.push(newTask);
        saveTasks(tasks);
        console.log(`✅ Task "${argv.description}" added successfully!`);
        console.log(`   ID: ${newTask.id}, Priority: ${newTask.priority}`);
        if (newTask.tags.length > 0) {
            console.log(`   Tags: ${newTask.tags.join(', ')}`);
        }
    })
    .command('list', 'List all tasks', (yargs) => {
        return yargs
            .option('completed', {
                alias: 'c',
                describe: 'Show only completed tasks',
                type: 'boolean'
            })
            .option('pending', {
                alias: 'p',
                describe: 'Show only pending tasks',
                type: 'boolean'
            })
            .option('priority', {
                alias: 'pr',
                describe: 'Filter by priority (low, medium, high)',
                type: 'string',
                choices: ['low', 'medium', 'high']
            })
            .option('tag', {
                alias: 't',
                describe: 'Filter by tag',
                type: 'string'
            });
    }, (argv) => {
        let tasks = readTasks();
        
        // Apply filters
        if (argv.completed) {
            tasks = tasks.filter(task => task.completed);
        } else if (argv.pending) {
            tasks = tasks.filter(task => !task.completed);
        }
        
        if (argv.priority) {
            tasks = tasks.filter(task => task.priority === argv.priority);
        }
        
        if (argv.tag) {
            tasks = tasks.filter(task => task.tags && task.tags.includes(argv.tag));
        }
        
        displayTasks(tasks);
    })
    .command('done <id>', 'Mark a task as completed', (yargs) => {
        return yargs.positional('id', {
            describe: 'Task ID to mark as completed',
            type: 'number',
            demandOption: true
        });
    }, (argv) => {
        const tasks = readTasks();
        const task = tasks.find((task) => task.id === argv.id);
        
        if (!task) {
            console.log('❌ Task not found!');
            return;
        }
        
        if (task.completed) {
            console.log('ℹ️  Task is already completed!');
            return;
        }
        
        task.completed = true;
        task.completedAt = new Date().toISOString();
        saveTasks(tasks);
        console.log(`✅ Task ${argv.id} marked as completed!`);
    })
    .command('delete <id>', 'Delete a task', (yargs) => {
        return yargs.positional('id', {
            describe: 'Task ID to delete',
            type: 'number',
            demandOption: true
        });
    }, (argv) => {
        const tasks = readTasks();
        const taskIndex = tasks.findIndex((task) => task.id === argv.id);
        
        if (taskIndex === -1) {
            console.log('❌ Task not found!');
            return;
        }
        
        const deletedTask = tasks[taskIndex];
        tasks.splice(taskIndex, 1);
        saveTasks(tasks);
        console.log(`🗑️  Task ${argv.id} "${deletedTask.description}" deleted successfully!`);
    })
    .command('stats', 'Show task statistics', () => {}, () => {
        const tasks = readTasks();
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const pending = total - completed;
        
        console.log('\n📊 Task Statistics:');
        console.log('─'.repeat(40));
        console.log(`Total Tasks: ${total}`);
        console.log(`Completed: ${completed}`);
        console.log(`Pending: ${pending}`);
        console.log(`Completion Rate: ${total > 0 ? Math.round((completed / total) * 100) : 0}%`);
        
        // Priority breakdown
        const priorityStats = tasks.reduce((acc, task) => {
            acc[task.priority] = (acc[task.priority] || 0) + 1;
            return acc;
        }, {});
        
        console.log('\nPriority Breakdown:');
        Object.entries(priorityStats).forEach(([priority, count]) => {
            console.log(`  ${priority}: ${count}`);
        });
        
        // Tag breakdown
        const tagStats = {};
        tasks.forEach(task => {
            task.tags.forEach(tag => {
                tagStats[tag] = (tagStats[tag] || 0) + 1;
            });
        });
        
        if (Object.keys(tagStats).length > 0) {
            console.log('\nTag Breakdown:');
            Object.entries(tagStats).forEach(([tag, count]) => {
                console.log(`  #${tag}: ${count}`);
            });
        }
    })
    .demandCommand(1, 'You need to specify a command. Use --help to see available commands.')
    .help()
    .alias('h', 'help')
    .version()
    .alias('v', 'version')
    .argv;
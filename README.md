# ToDo CLI - Command Line Task Manager

## 🎯 Project Choice

**Option 2 – Command-Line To-Do App**

I chose to create a feature-rich command-line task manager that runs in the terminal and stores tasks in a JSON file. This option provides a practical, everyday tool that can be used across different operating systems and integrated into various workflows.

## 🚀 How to Run the Program

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation
1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd "ToDo Cli"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Usage Examples

#### Basic Commands
```bash
# Add a new task
node task.js add "Buy milk"

# List all tasks
node task.js list

# Mark task as completed
node task.js done 1

# Delete a task
node task.js delete 2

# Show statistics
node task.js stats
```

#### Advanced Usage with Options
```bash
# Add task with priority and tags
node task.js add "Call mom" --priority high --tags "personal,family"

# List only completed tasks
node task.js list --completed

# List only high priority tasks
node task.js list --priority high

# Filter by tag
node task.js list --tag shopping

# Use shortcuts
node task.js add "Meeting" -p medium -t "work,urgent"
```

#### Get Help
```bash
# Show all commands
node task.js --help

# Show help for specific command
node task.js add --help
```

## 🛠️ Language and Tools Used

### Core Technologies
- **Node.js** - JavaScript runtime environment
- **JavaScript (ES6+)** - Programming language
- **yargs** - Command-line argument parsing library

### Dependencies
- **yargs** (^18.0.0) - Modern command-line argument parser
- **fs** (built-in) - File system operations

### File Structure
```
ToDo Cli/
├── README.md          # This file
├── package.json       # Project configuration and dependencies
├── package-lock.json  # Dependency lock file
├── task.js           # Main application file
└── tasks.json        # Task storage file (created automatically)
```

## ✨ Features

### Core Requirements ✅
- **Add tasks** - Create new tasks with descriptions
- **List tasks** - View all tasks with index numbers
- **Mark as done** - Complete tasks by ID
- **Delete tasks** - Remove tasks by ID
- **Persistent storage** - Tasks saved to `tasks.json` file

### Bonus Features 🎁
- **Timestamps** - Creation and completion timestamps
- **Priorities** - Low, medium, high priority levels
- **Tags/Categories** - Organize tasks with custom tags
- **Advanced filtering** - Filter by status, priority, or tags
- **Statistics** - Comprehensive task analytics
- **Beautiful UI** - Emojis and formatted output
- **Input validation** - Error handling and user feedback
- **Shortcut aliases** - Quick command options

### Task Data Structure
Each task includes:
```json
{
  "id": 1,
  "description": "Buy milk",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "priority": "high",
  "tags": ["shopping", "groceries"],
  "completedAt": "2024-01-15T11:00:00.000Z"
}
```

## 🔧 Command Reference

| Command | Description | Options |
|---------|-------------|---------|
| `add <description>` | Add new task | `--priority`, `--tags` |
| `list` | Show all tasks | `--completed`, `--pending`, `--priority`, `--tag` |
| `done <id>` | Mark task complete | None |
| `delete <id>` | Remove task | None |
| `stats` | Show statistics | None |

### Option Details
- **`--priority`** (`-p`): Set priority (low/medium/high)
- **`--tags`** (`-t`): Comma-separated tags
- **`--completed`** (`-c`): Show only completed tasks
- **`--pending`** (`-p`): Show only pending tasks
- **`--tag`** (`-t`): Filter by specific tag

## 📊 Sample Output

### Adding a Task
```bash
$ node task.js add "Buy groceries" --priority high --tags "shopping,urgent"
✅ Task "Buy groceries" added successfully!
   ID: 1, Priority: high
   Tags: shopping, urgent
```

### Listing Tasks
```bash
$ node task.js list

📋 Task List:
────────────────────────────────────────────────────────────────────────────────
✅ 1. Buy groceries [HIGH] #shopping #urgent
   Created: 1/15/2024, 10:30:00 AM

⏳ 2. Call mom [MEDIUM] #personal #family
   Created: 1/15/2024, 10:35:00 AM
```

### Statistics
```bash
$ node task.js stats

📊 Task Statistics:
────────────────────────────────────────
Total Tasks: 2
Completed: 1
Pending: 1
Completion Rate: 50%

Priority Breakdown:
  high: 1
  medium: 1

Tag Breakdown:
  shopping: 1
  urgent: 1
  personal: 1
  family: 1
```

## 🚨 Error Handling

The application includes comprehensive error handling:
- Invalid task IDs
- Missing required arguments
- File read/write errors
- Input validation
- User-friendly error messages

## 🔄 Data Persistence

- Tasks are automatically saved to `tasks.json`
- File is created automatically on first use
- Data persists between program runs
- JSON format for easy debugging and manual editing

## 🎨 User Experience Features

- **Visual indicators**: Emojis for status (✅⏳🗑️📋📊)
- **Formatted output**: Clean, readable task display
- **Colorful feedback**: Success and error messages
- **Flexible input**: Multiple ways to specify options
- **Help system**: Built-in documentation

## 🚀 Future Enhancements

Potential improvements that could be added:
- Due dates and reminders
- Task categories and projects
- Export/import functionality
- Search and advanced filtering
- Task editing capabilities
- Backup and sync features

## 📝 License

This project is open source and available under the ISC License.

---

**Happy task managing! 🎯✨**

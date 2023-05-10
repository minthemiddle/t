function todoApp() {
    return {
      taskTitle: '',
      tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  
      addTask() {
        const title = this.taskTitle.trim();
        if (title !== '') {
          const newTask = {
            type: 'to-do',
            attributes: { title }
          };
          this.tasks.push(newTask);
          this.taskTitle = '';
          this.saveTasksToLocalStorage();
        }
      },
  
      deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasksToLocalStorage();
      },
  
      saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },
  
      copyTasks() {
        const encodedTasks = encodeURIComponent(JSON.stringify(this.tasks));
        const url = `open 'things:///json?data=${encodedTasks}'`;
        navigator.clipboard.writeText(url);
        alert('Tasks copied to clipboard!');
      }
    };
  }
  
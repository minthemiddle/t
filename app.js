function todoApp() {
    return {
      taskTitle: '',
      tasks: [],
  
      addTask() {
        const title = this.taskTitle.trim();
        if (title !== '') {
          this.tasks.push({
            type: 'to-do',
            attributes: { title }
          });
          this.taskTitle = '';
        }
      },
  
      deleteTask(index) {
        this.tasks.splice(index, 1);
      },
  
      copyTasks() {
        const encodedTasks = encodeURIComponent(JSON.stringify(this.tasks));
        const url = `open 'things:///json?data=${encodedTasks}'`;
        navigator.clipboard.writeText(url);
        alert('Tasks copied to clipboard!');
      }
    };
  }
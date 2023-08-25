function app() {
    return {
      taskTitle: '',
      tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),

      dragIndex: null,

        taskData(index) {
            return {
                index,
                startDrag() {
                this.dragIndex = index;
                },
            };
        },

        dragStart(event) {
            event.dataTransfer.setData('text/plain', ''); // Required for drag to work
            this.dragIndex = this.index;
          },

          dragOver(event) {
            event.preventDefault();
          },

        
          drop(targetIndex) {
            if (this.dragIndex === null || this.dragIndex === targetIndex) return;
            
            const [draggedTask] = this.tasks.splice(this.dragIndex, 1);
            this.tasks.splice(targetIndex, 0, draggedTask);
      
            this.dragIndex = null;
            this.saveTasksToLocalStorage();
          },
  
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
      },

      deleteAllTasks() {
        this.tasks = [];
        this.saveTasksToLocalStorage();
    },
    };
  }
  
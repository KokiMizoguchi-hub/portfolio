new Vue({
  el: '#app',
  data() {
    return {
      isSideMenuOpen: false,
      showTaskForm: false,
      taskName: '',
      taskDescription: '',
      taskPriority: 'low',
      taskTime: '',
      taskInbox: 'inbox',
      categories: ['今日の予定', '明日の予定', '今週の予定', '来月の予定', '予定なし'],
      tasks: [
        { text: 'Example Task 1', time: '10:00', category: 'today', done: false, priority: 'low' },
        { text: 'Example Task 2', time: '12:00', category: 'tomorrow', done: false, priority: 'medium' },
        { text: 'Example Task 3', time: '14:00', category: 'upcoming', done: false, priority: 'high' },
        { text: 'Example Task 4', time: '16:00', category: 'month', done: false, priority: 'medium' },
        { text: 'Example Task 5', time: '', category: 'noDueDate', done: false, priority: 'low' }
      ]
    };
  },
  computed: {
    getCheckmarkColor() {
      return (priority) => {
        switch (priority) {
          case 'low':
            return 'checkmark-blue';
          case 'medium':
            return 'checkmark-yellow';
          case 'high':
            return 'checkmark-red';
          default:
            return '';
        }
      };
    }
  },
  methods: {
    toggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen;
    },
    toggleTaskForm() {
      this.showTaskForm = !this.showTaskForm;
    },
    addDetailedTask() {
      if (this.taskName.trim() === '') {
        alert('タスク名を入力してください');
        return;
      }
      
      const newTask = {
        text: this.taskName,
        description: this.taskDescription,
        priority: this.taskPriority,
        time: this.taskTime,
        inbox: this.taskInbox,
        category: 'today',
        done: false
      };
      this.tasks.push(newTask);

      this.taskName = '';
      this.taskDescription = '';
      this.taskPriority = 'low';
      this.taskTime = '';
      this.taskInbox = 'inbox';
      this.showTaskForm = false;
    },
    removeTask(index, category) {
      const taskIndex = this.tasks.findIndex(
        task => task.category === category && task.text === this.filteredTasks(category)[index].text
      );
      this.tasks.splice(taskIndex, 1);
    },
    filteredTasks(category) {
      return this.tasks.filter(task => task.category === category);
    },
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    getCategoryIcon(category) {
      switch (category) {
        case '今日の予定':
          return 'fas fa-calendar-day';
        case '明日の予定':
          return 'fas fa-calendar-alt';
        case '今週の予定':
          return 'fas fa-calendar-week';
        case '来月の予定':
          return 'fas fa-calendar-times';
        case '予定なし':
          return 'fas fa-calendar-times';
        default:
          return '';
      }
    },
    closeSideMenu() {
      this.isSideMenuOpen = false;
    },
    cancelTask() {
      this.taskName = '';
      this.taskDescription = '';
      this.taskPriority = 'low';
      this.taskTime = '';
      this.taskInbox = 'inbox';
      this.showTaskForm = false;
    }
  }
});

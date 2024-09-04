new Vue({
  el: '#app',
  data() {
    return {
      isSideMenuOpen: false,
      showTaskForm: false,
      showNotifications: false,
      taskName: '',
      taskDescription: '',
      taskPriority: 'low',
      taskTime: '',
      taskInbox: '個人',  // デフォルトを「趣味」に設定
      categories: [
        '今日の予定',
        '明日の予定',
        '今週の予定',
        '今月の予定',
        '来月の予定',
        '予定なし',
        'インボックス',
        '仕事',
        '学習',
        '個人',
        '趣味'
      ],
      tasks: [
        {
          text: '例: タスク 1',
          time: '10:00',
          category: '個人',  // カテゴリを「趣味」に設定
          done: false,
          priority: 'low'
        }
      ],
      notifications: ['新しいタスクが追加されました。', '今日の予定があります。'], // 仮の通知
    };
  },
  computed: {
    groupedTasks() {
      const grouped = {};
      // カテゴリごとにタスクをグループ化
      this.tasks.forEach(task => {
        if (!grouped[task.category]) {
          grouped[task.category] = [];
        }
        grouped[task.category].push(task);
      });
      return grouped;
    }
  },
  methods: {
    toggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen;

      const hamburgerMenu = document.querySelector('.hamburger-menu');
      if (this.isSideMenuOpen) {
        hamburgerMenu.style.display = 'none';
      } else {
        hamburgerMenu.style.display = 'block';
      }
    },
    closeSideMenu() {
      this.isSideMenuOpen = false;
      const hamburgerMenu = document.querySelector('.hamburger-menu');
      hamburgerMenu.style.display = 'block';
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
        category: '個人',  // カテゴリを「趣味」に固定
        done: false
      };

      this.tasks.push(newTask);

      // フォームのフィールドをリセット
      this.taskName = '';
      this.taskDescription = '';
      this.taskPriority = 'low';
      this.taskTime = '';
      this.showTaskForm = false;

      this.addNotification('新しいタスクが追加されました。');
    },
    removeTask(taskToRemove) {
      this.tasks = this.tasks.filter(task => task !== taskToRemove);
    },
    getCheckmarkColor(priority) {
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
    },
    getCategoryIcon(category) {
      switch (category) {
        case '今日の予定':
          return 'fas fa-calendar-day icon-today';
        case '明日の予定':
          return 'fas fa-calendar-alt icon-tomorrow';
        case '今週の予定':
          return 'fas fa-calendar-week icon-this-week';
        case '今月の予定':
          return 'fas fa-calendar icon-this-month';
        case '来月の予定':
          return 'fas fa-calendar-plus icon-next-month';
        case '予定なし':
          return 'fas fa-calendar-times icon-no-schedule';
        case 'インボックス':
          return 'fas fa-inbox icon-inbox';
        case '個人':
          return 'fas fa-user icon-personal';
        case '仕事':
          return 'fas fa-briefcase icon-work';
        case '学習':
          return 'fas fa-book icon-study';
        case '趣味':
          return 'fas fa-heart icon-hobby';
        default:
          return '';
      }
    },
    getCategoryCount(category) {
      return this.tasks.filter(task => task.category === category).length;
    },
    getInboxTitle(category) {
      return category;
    },
    getCategoryLink(category) {
      return '#';  // 必要に応じてリンク先を実装
    },
    cancelTask() {
      this.taskName = '';
      this.taskDescription = '';
      this.taskPriority = 'low';
      this.taskTime = '';
      this.showTaskForm = false;
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
    },
    addNotification(message) {
      this.notifications.push(message);
      this.showNotifications = true;

      setTimeout(() => {
        this.showNotifications = false;
      }, 5000);
    }
  }
});

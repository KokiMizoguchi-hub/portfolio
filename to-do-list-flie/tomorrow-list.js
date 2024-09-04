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
      taskInbox: 'inbox',
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
          category: '明日の予定',
          done: false,
          priority: 'low',
          inbox: 'inbox'
        },
        {
          text: '例: タスク 2',
          time: '12:00',
          category: '明日の予定',
          done: false,
          priority: 'medium',
          inbox: 'personal'
        }
      ],
      visibleCategories: ['inbox', 'personal'], // 初めはインボックスと個人のみ表示
      notifications: ['新しいタスクが追加されました。', '明日の予定があります。'], // 仮の通知
    };
  },
  computed: {
    groupedTasks() {
      const grouped = {};
      const todayTasks = this.tasks.filter(
        task => task.category === '明日の予定'
      );
      todayTasks.forEach(task => {
        if (this.visibleCategories.includes(task.inbox)) {
          if (!grouped[task.inbox]) {
            grouped[task.inbox] = [];
          }
          grouped[task.inbox].push(task);
        }
      });
      return grouped;
    }
  },
  methods: {
    toggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen;

      // サイドメニューが開かれたらハンバーガーメニューを非表示にする
      const hamburgerMenu = document.querySelector('.hamburger-menu');
      if (this.isSideMenuOpen) {
        hamburgerMenu.style.display = 'none';
      } else {
        hamburgerMenu.style.display = 'block';
      }
    },
    closeSideMenu() {
      this.isSideMenuOpen = false;

      // サイドメニューが閉じられたらハンバーガーメニューを再表示する
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
        inbox: this.taskInbox,
        category: '明日の予定',
        done: false
      };

      this.tasks.push(newTask);

      if (!this.visibleCategories.includes(this.taskInbox)) {
        this.visibleCategories.push(this.taskInbox);
      }

      this.taskName = '';
      this.taskDescription = '';
      this.taskPriority = 'low';
      this.taskTime = '';
      this.taskInbox = 'inbox';
      this.showTaskForm = false;

      // 新しいタスクが追加された際に通知を表示
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
      if (category === '明日の予定') {
        return this.tasks.filter(task => task.category === category).length;
      } else {
        return this.tasks.filter(
          task => this.getInboxTitle(task.inbox) === category
        ).length;
      }
    },
    getInboxTitle(inbox) {
      switch (inbox) {
        case 'inbox':
          return 'インボックス';
        case 'personal':
          return '個人';
        case 'work':
          return '仕事';
        case 'study':
          return '学習';
        case 'hobby':
          return '趣味';
        default:
          return '';
      }
    },
    getCategoryLink(category) {
      switch (category) {
        case '今日の予定':
          return 'to-do-list.html';
        case '明日の予定':
          return 'tomorrow-list.html';
        case '今週の予定':
          return 'week-list.html';
        case '今月の予定':
          return 'thismonth-list.html';
        case '来月の予定':
          return 'nextmonth-list.html';
        case '予定なし':
          return 'nothing-list.html';
        default:
          return '#';
      }
    },
    cancelTask() {
      this.taskName = '';
      this.taskDescription = '';
      this.taskPriority = 'low';
      this.taskTime = '';
      this.taskInbox = 'inbox';
      this.showTaskForm = false;
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      
      const notificationBubble = document.querySelector('.notification-bubble');
      if (this.showNotifications) {
        notificationBubble.classList.add('active');
      } else {
        notificationBubble.classList.remove('active');
      }
    },
    addNotification(message) {
      this.notifications.push(message);
      this.showNotifications = true;


      setTimeout(() => {
        this.showNotifications = false;
      }, 5000); // 5秒後に非表示
    }
  }
});

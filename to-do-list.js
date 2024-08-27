new Vue({
<<<<<<< HEAD
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
        categories: ['今日の予定', '明日の予定', '今週の予定', '来月の予定', '予定なし', '仕事', '学習', '個人', '趣味'],
        tasks: [
          { text: 'Example Task 1', time: '10:00', category: 'today', done: false, priority: 'low', inbox: 'inbox' },
          { text: 'Example Task 2', time: '12:00', category: 'today', done: false, priority: 'medium', inbox: 'personal' },
          { text: 'Example Task 3', time: '14:00', category: 'today', done: false, priority: 'high', inbox: 'work' },
          { text: 'Example Task 4', time: '16:00', category: 'today', done: false, priority: 'medium', inbox: 'study' },
          { text: 'Example Task 5', time: '', category: 'today', done: false, priority: 'low', inbox: 'hobby' }
        ],
        displayedInboxes: {} // インボックスごとの初回表示を管理
      };
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
  
        this.displayedInboxes = {};
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
      getCheckmarkColor(priority) {
=======
  el: '#app',
  data() {
    return {
      isSideMenuOpen: false,
      showTaskForm: false,
      taskName: '',
      taskDescription: '',
      taskPriority: 'low',
      taskTime: '',
      taskInbox: 'inbox', // タスクのインボックスをデフォルトで 'inbox' に設定
      categories: ['今日の予定', '明日の予定', '今週の予定', '来月の予定', '予定なし'],
      tasks: [
        { text: 'Example Task 1', time: '10:00', category: 'today', done: false, priority: 'low', inbox: 'inbox' },
        { text: 'Example Task 2', time: '12:00', category: 'today', done: false, priority: 'medium', inbox: 'personal' },
        { text: 'Example Task 3', time: '14:00', category: 'today', done: false, priority: 'high', inbox: 'work' },
        { text: 'Example Task 4', time: '16:00', category: 'today', done: false, priority: 'medium', inbox: 'study' },
        { text: 'Example Task 5', time: '', category: 'today', done: false, priority: 'low', inbox: 'hoppy' }
      ],
      displayedInboxes: {} // インボックス名が表示されたかどうかを追跡するオブジェクト
    };
  },
  computed: {
    getCheckmarkColor() {
      return (priority) => {
>>>>>>> 0fa2d4e10f0432c7096339a7dc2e68270d7d16e0
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
<<<<<<< HEAD
      },
      capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      },
      getCategoryIcon(category) {
        switch (category) {
          case '今日の予定':
            return 'fas fa-calendar-day icon-today';
          case '明日の予定':
            return 'fas fa-calendar-alt icon-tomorrow';
          case '今週の予定':
            return 'fas fa-calendar-week icon-this-week';
          case '来月の予定':
            return 'fas fa-calendar-times icon-next-month';
          case '予定なし':
            return 'fas fa-calendar-times icon-no-schedule';
          case '仕事':
            return 'fas fa-briefcase icon-work';
          case '学習':
            return 'fas fa-book icon-study';
          case '個人':
            return 'fas fa-user icon-personal';
          case '趣味':
            return 'fas fa-heart icon-hobby';
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
      shouldDisplayInboxTitle(inbox) {
        // 既に表示済みでない場合のみ表示し、インデックスを保存
        if (!this.displayedInboxes[inbox]) {
          this.$set(this.displayedInboxes, inbox, true);
          return true;
        }
        return false;
      }
    }
  });
  
=======
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
        inbox: this.taskInbox, // タスクに選択されたインボックスを保存
        category: 'today',
        done: false
      };
      this.tasks.push(newTask);

      // フォームをリセット
      this.taskName = '';
      this.taskDescription = '';
      this.taskPriority = 'low';
      this.taskTime = '';
      this.taskInbox = 'inbox';
      this.showTaskForm = false;

      // タスクが追加された後に追跡オブジェクトをリセット
      this.displayedInboxes = {};
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
        case 'hoppy':
          return '趣味';
        default:
          return '';
      }
    },
    shouldDisplayInboxTitle(inbox) {
      if (this.displayedInboxes[inbox]) {
        return false;
      }

      this.$set(this.displayedInboxes, inbox, true);
      return true;
    }
  }
});
>>>>>>> 0fa2d4e10f0432c7096339a7dc2e68270d7d16e0

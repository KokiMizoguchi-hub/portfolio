new Vue({
  el: '#app',
  data: {
    showPageOne: true,
    showBlackout: false,
    dotColor: 'rgb(255, 255, 255)',
    scrollLocked: false,
    isZooming: false,
    showIcons: false,
    showBoxes: false,
    currentLanguage: 'en', // 現在の言語を追加
    texts: { // テキストを定義
      ja: {
        home: 'ホーム',
        about: '紹介',
        services: 'サービス',
        contact: 'お問い合わせ',
        exploreWorks: '作品を探る',
        contentStrategy: 'コンテンツ戦略',
        work: '仕事',
        contact: '連絡',
        recent: '最近の仕事',
        Mastering: '購買管理のマスター',
        Theimportance: 'Eインボイシングの重要性は近年大幅に増加していますが、新しい技術ではありません。',
        Alittlebitaboutme: '自己紹介',
        began: 'こんにちは、ウェブ開発者のKokiと申します。私はウェブ開発者としてのキャリアを築いており、1年間の独学期間を経て、HTML、CSS、JavaScript、Python、UI/UXなどのプログラミング言語を習得しました。その後、インドのITスクールで6か月間学び、さらに深い知識と実践的なスキルを身に付けました。',
        introduce: "これまでに、1つのフリーランスプロジェクトを独立して完了しました。クライアントの要件を元に設計から実装まで一貫して担当し、高い評価を得ました。現在は日本の会社で働いており、英語とプログラミングのスキルを活かして、フロントエンドおよびバックエンドの開発に取り組んでいます。",        

      },
      en: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        contact: 'Contact',
        exploreWorks: 'Explore Works',
        contentStrategy: 'Content Strategy',
        work: 'Work',
        contact: 'Contact',
        recent: 'Recent Works',
        Mastering: 'Mastering Purchase Order Management',
        Theimportance: 'The importance of e-Invoicing has been increasing significantly in recent years, although it is not a new technology.',
        Alittlebitaboutme: 'A little bit about me',
        began: 'Hello, my name is Koki Mizoguchi, and I am a web developer. I have built my career in web development through a year of self-study, during which I learned programming languages such as HTML, CSS, JavaScript, Python, and UI/UX design. Following that, I attended an IT school in India for six months, where I gained deeper knowledge and practical skills.',
        introduce:"So far, I have successfully completed one freelance project independently. I was responsible for everything from design to implementation based on the client's requirements, and I received high praise for my work. Currently, I am working for a company in Japan, where I utilize my skills in English and programming to work on both front-end and back-end development."
      }
    }
  },
  methods: {
    handleScroll() {
      if (this.scrollLocked) {
        window.scrollTo(0, 0);
        return;
      }

      const threshold = document.querySelector('.page6').offsetHeight;

      // スクロールに応じてページを切り替える
      if (window.scrollY >= threshold) {
        this.showPageOne = false;
      } else {
        this.showPageOne = true;
      }

      // アイコン表示の判定
      const iconThreshold = 100; // アイコンが表示されるスクロール位置
      if (window.scrollY >= iconThreshold && !this.showIcons) {
        this.showIcons = true;
      }

      // ボックス表示の判定
      const boxThreshold = document.querySelector('.box3').offsetTop - window.innerHeight + 100; // ボックスが表示されるスクロール位置
      if (window.scrollY >= boxThreshold && !this.showBoxes) {
        this.showBoxes = true;
      }

      // スクロール位置に基づいてドットの色を変更
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const colorValue = Math.max(0, Math.round(255 * (1 - scrollPercent * 5)));
      this.dotColor = `rgb(255, ${colorValue}, ${colorValue})`;
    },
    initializeWaves() {
      createWave('.wave-container', 'animate-right'); // 右からゆっくり表示する矢印
      createWave('.wave-container1', 'animate-left'); // 左からゆっくり表示する矢印
      createWave('.wave-container2', 'animate-right'); // 左からゆっくり表示する矢印
    },
    lockScroll() {
      this.scrollLocked = true;
      setTimeout(() => {
        this.scrollLocked = false;
      }, 500);
    },
    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === 'ja' ? 'en' : 'ja';
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
    this.initializeWaves();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    showPageOne(newVal) {
      if (!newVal) {
        this.showBlackout = true;
        // side-menu1を非表示にする
        document.getElementById('side-menu1').style.visibility = 'hidden';
        setTimeout(() => {
          this.showBlackout = false;
          this.$nextTick(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.lockScroll();
            // アニメーションが終わった後にside-menu1を再表示する
            document.getElementById('side-menu1').style.visibility = 'visible';
          });
        }, 100);
      }
    }
  }
});

function createWave(containerClass, animationClass) {
  const waveContainer = document.querySelector(containerClass); // 引数で渡されたクラス名の要素を取得
  if (!waveContainer) return; // 要素が見つからない場合は処理を終了

  for (let i = 0; i < 12; i++) { // 12行を作成
    for (let j = 0; j < 12; j++) { // 各行に12列を作成
      const waveElement = document.createElement('div'); // 新しいdiv要素を作成
      waveElement.classList.add('wave'); // waveクラスを追加
      if ((i + j) % 5 === 0) { // 特定の条件を満たす場合
        waveElement.classList.add('red'); // redクラスを追加
      }
      const arrow = document.createElement('div'); // 新しいdiv要素を作成
      arrow.classList.add('arrow'); // arrowクラスを追加
      waveElement.appendChild(arrow); // wave要素にarrow要素を追加
      waveContainer.appendChild(waveElement); // wave-container要素にwave要素を追加
    }
  }

  // アニメーションを追加
  waveContainer.classList.add(animationClass);
}

document.addEventListener('DOMContentLoaded', function() {
  const menus = [
    { menu: document.getElementById('hamburger-menu'), sideMenu: document.getElementById('side-menu') },
    { menu: document.getElementById('hamburger-menu1'), sideMenu: document.getElementById('side-menu1') }
  ];

  menus.forEach(function(item) {
    item.menu.addEventListener('click', function() {
      if (item.sideMenu.classList.contains('side-menu-open')) {
        item.sideMenu.classList.remove('side-menu-open');
        item.menu.classList.remove('open');
      } else {
        item.sideMenu.classList.add('side-menu-open');
        item.menu.classList.add('open');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const floatingElements = document.querySelectorAll('.floating-element');

  function checkVisibility() {
    floatingElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        element.classList.add('float-in');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility();
});

/* ==========================================================================
   ARTIE Bowling & Dining PoC Web App - State Machine & Interaction Engine
   ========================================================================== */

// --- Application State ---
const state = {
  preset: 'senior_lunch',
  date: '2025-12-09',
  time: '11:30',
  playerCount: 2,
  players: [],
  currentInput: {
    playerIndex: 0,
    frameIndex: 0,
    shotIndex: 0
  },
  activeTab: 'recommended',
  activeCoupon: null,
  cart: [],
  overheadMessage: { title: 'READY TO BOWL', sub: '投球してください', icon: '🎳', voucherCode: '#7842' },
  activeAction: 'default'
};

// --- Presets Data Definition (with raw frame rolls) ---
const PRESETS = {
  senior_lunch: {
    time: '11:30',
    timeTag: '昼の健康ランチタイム (10:00〜14:00)',
    timeSlotName: '昼・シニアリーグ',
    playerCount: 2,
    players: [
      {
        name: '田中様 (68歳)',
        tag: 'リーグ会員',
        frames: [
          { rolls: [9, 1] },
          { rolls: [10] },
          { rolls: [8, 1] },
          { rolls: [9, 1] },
          { rolls: [10] },
          { rolls: [9, 1] },
          { rolls: [10] },
          { rolls: [8, 1] },
          { rolls: [9, 1] },
          { rolls: [10, 9] }
        ]
      },
      {
        name: '佐藤様 (65歳)',
        tag: 'リーグ会員',
        frames: [
          { rolls: [8, 1] },
          { rolls: [9, 1] },
          { rolls: [8, 1] },
          { rolls: [9, 1] },
          { rolls: [9, 0] },
          { rolls: [8, 1] },
          { rolls: [9, 1] },
          { rolls: [8, 1] },
          { rolls: [9, 1] },
          { rolls: [8, 1] }
        ]
      }
    ]
  },
  student_afternoon: {
    time: '16:30',
    timeTag: '放課後カフェ＆スナックタイム (15:00〜18:00)',
    timeSlotName: '夕方・学生グループ',
    playerCount: 4,
    players: [
      {
        name: 'ユウキ',
        tag: '高校2年',
        frames: [
          { rolls: [10] },
          { rolls: [9, 1] },
          { rolls: [10] },
          { rolls: [7, 2] },
          { rolls: [10] },
          { rolls: [8, 2] },
          { rolls: [9, 0] },
          { rolls: [10] },
          { rolls: [9, 1] },
          { rolls: [10, 10, 9] }
        ]
      },
      {
        name: 'レン',
        tag: '高校2年',
        frames: [
          { rolls: [8, 1] },
          { rolls: [9, 0] },
          { rolls: [7, 3] },
          { rolls: [8, 1] },
          { rolls: [9, 1] },
          { rolls: [8, 0] },
          { rolls: [10] },
          { rolls: [7, 2] },
          { rolls: [8, 2] },
          { rolls: [9, 0] }
        ]
      },
      {
        name: 'ハルト',
        tag: '高校2年',
        frames: [
          { rolls: [7, 2] },
          { rolls: [8, 1] },
          { rolls: [6, 3] },
          { rolls: [7, 3] },
          { rolls: [8, 1] },
          { rolls: [9, 0] },
          { rolls: [7, 2] },
          { rolls: [8, 1] },
          { rolls: [9, 0] },
          { rolls: [8, 1] }
        ]
      },
      {
        name: 'ソウタ',
        tag: '高校2年',
        frames: [
          { rolls: [10] },
          { rolls: [8, 1] },
          { rolls: [10] },
          { rolls: [9, 0] },
          { rolls: [8, 2] },
          { rolls: [7, 2] },
          { rolls: [10] },
          { rolls: [9, 1] },
          { rolls: [8, 1] },
          { rolls: [9, 1, 8] }
        ]
      }
    ]
  },
  adult_evening: {
    time: '19:30',
    timeTag: 'ナイトボウリング＆バルタイム (18:00〜24:00)',
    timeSlotName: '夜間・社会人宴会',
    playerCount: 4,
    players: [
      {
        name: '山田部長',
        tag: '会社団体',
        frames: [
          { rolls: [10] },
          { rolls: [10] },
          { rolls: [9, 1] },
          { rolls: [8, 1] },
          { rolls: [10] },
          { rolls: [9, 1] },
          { rolls: [8, 1] },
          { rolls: [10] },
          { rolls: [9, 1] },
          { rolls: [10, 9] }
        ]
      },
      {
        name: '鈴木課長',
        tag: '会社団体',
        frames: [
          { rolls: [8, 1] },
          { rolls: [9, 1] },
          { rolls: [10] },
          { rolls: [8, 1] },
          { rolls: [9, 0] },
          { rolls: [8, 2] },
          { rolls: [7, 2] },
          { rolls: [10] },
          { rolls: [8, 1] },
          { rolls: [9, 0] }
        ]
      },
      {
        name: '高橋主任',
        tag: '会社団体',
        frames: [
          { rolls: [9, 0] },
          { rolls: [8, 1] },
          { rolls: [7, 2] },
          { rolls: [8, 2] },
          { rolls: [9, 0] },
          { rolls: [7, 2] },
          { rolls: [8, 1] },
          { rolls: [9, 0] },
          { rolls: [8, 1] },
          { rolls: [7, 2] }
        ]
      },
      {
        name: '渡辺',
        tag: '会社団体',
        frames: [
          { rolls: [10] },
          { rolls: [9, 1] },
          { rolls: [8, 1] },
          { rolls: [10] },
          { rolls: [9, 0] },
          { rolls: [8, 1] },
          { rolls: [9, 1] },
          { rolls: [8, 1] },
          { rolls: [10] },
          { rolls: [10, 8, 1] }
        ]
      }
    ]
  },
  family_weekend: {
    time: '13:00',
    timeTag: 'ホリデー・ファミリータイム (土日祝)',
    timeSlotName: '休日・ファミリー',
    playerCount: 3,
    players: [
      {
        name: 'お父さん',
        tag: '一般',
        frames: [
          { rolls: [10] },
          { rolls: [9, 1] },
          { rolls: [8, 1] },
          { rolls: [10] },
          { rolls: [9, 0] },
          { rolls: [8, 2] },
          { rolls: [7, 2] },
          { rolls: [8, 1] },
          { rolls: [9, 1] },
          { rolls: [10, 8, 1] }
        ]
      },
      {
        name: 'お母さん',
        tag: '一般',
        frames: [
          { rolls: [7, 2] },
          { rolls: [8, 1] },
          { rolls: [9, 0] },
          { rolls: [8, 1] },
          { rolls: [7, 2] },
          { rolls: [8, 2] },
          { rolls: [9, 0] },
          { rolls: [8, 1] },
          { rolls: [7, 2] },
          { rolls: [8, 1] }
        ]
      },
      {
        name: 'ゆうと(7才)',
        tag: 'キッズ',
        frames: [
          { rolls: [0, 0] },
          { rolls: [4, 2] },
          { rolls: [0, 3] },
          { rolls: [5, 1] },
          { rolls: [0, 0] },
          { rolls: [3, 2] },
          { rolls: [4, 1] },
          { rolls: [0, 2] },
          { rolls: [3, 1] },
          { rolls: [4, 2] }
        ]
      }
    ]
  }
};

// --- Segment-Specific Event & Coupon Rules ---
const SEGMENT_EVENT_RULES = {
  senior_lunch: {
    strike: {
      buttonLabel: '🎳 ストライク！',
      title: '🎳 STRIKE BONUS! 挽きたて珈琲 or ミニデザート 100円引',
      desc: 'お見事です！ゲーム後のランチ・喫茶で使える限定割引です。',
      icon: '☕',
      typeClass: 'type-special',
      isNonImmediate: false,
      discount: 100,
      actionText: '珈琲値引きで注文',
      overhead: { title: 'STRIKE!', sub: 'お見事！ナイスストライク！', icon: '🎳' },
      toast: '🎳 ストライク達成！レーン端末に珈琲値引き特典が付与されました',
      rationaleKey: 'strike'
    },
    turkey: {
      buttonLabel: '🔥 ターキー達成！',
      title: '🔥 ターキー達成記念！特製デザートプレート進呈',
      desc: '3連続ストライク達成！お連れ様とシェアできるデザートプレートです。',
      icon: '👑',
      typeClass: 'type-special',
      isNonImmediate: false,
      discount: 400,
      note: '本端末限定・発行から30分間のみ有効です。',
      actionText: 'デザートプレートを適用',
      overhead: { title: '🔥 TURKEY ACHIEVED! 🔥', sub: '3連続ストライク達成！プレミアム特典発動！', icon: '🦃' },
      toast: '🔥 ターキー達成！プレミアムデザートプレート特典を付与しました',
      rationaleKey: 'turkey'
    },
    date_easteregg: {
      buttonLabel: '📅 日付スコア (129点)',
      title: '🎉 【本日限定イースターエッグ】日付賞 (12/9 ➔ 129点達成！)',
      desc: '本日プレイ日 [12月9日] とスコアが一致！『生パスタ 200円引き』',
      icon: '📅',
      typeClass: 'type-easteregg',
      isNonImmediate: false,
      discount: 200,
      note: '本特典は本日日付限定の特別イースターエッグです。条件は日替わりで変化します。',
      actionText: '生パスタ200円引で注文',
      overhead: { title: 'SECRET EASTER EGG!', sub: '本日限定 [12月9日＝129点] ピタリ的中！', icon: '🎉' },
      toast: '📅 日付連動イースターエッグを発見しました！',
      rationaleKey: 'date_easteregg'
    },
    birthday_easteregg: {
      buttonLabel: '🎂 誕生月ボーナス',
      title: '🎂 【誕生月サプライズ】お誕生日おめでとうございます！',
      desc: '誕生月のご来店感謝！『バースデーハーフドルチェ 無料プレゼント』',
      icon: '🎂',
      typeClass: 'type-easteregg',
      isNonImmediate: false,
      discount: 500,
      note: 'お誕生月限定の特別おもてなし特典です。',
      actionText: 'バースデードルチェを注文',
      overhead: { title: 'HAPPY BIRTHDAY!', sub: 'お誕生日おめでとうございます！', icon: '🎂' },
      toast: '🎂 誕生月サプライズクーポンが付与されました！',
      rationaleKey: 'birthday_easteregg'
    },
    gameover_dining: {
      buttonLabel: '🏁 2ゲーム終了 (送客)',
      title: '🏁 【ゲーム終了特典】隣接イタリアン Bolo ダイニング送客クーポン',
      desc: 'ボウリングお疲れ様でした！隣接レストラン席にて『挽きたて珈琲無料 / お食事10%OFF』',
      icon: '🍝',
      typeClass: 'type-dining',
      isNonImmediate: true,
      voucherCode: '7842',
      note: 'Boloのレジにて画面のQRコード読み取りまたは番号 [#7842] をご提示ください。',
      overhead: { title: '2 GAMES COMPLETED', sub: 'ゲームお疲れ様でした！Boloで乾杯＆ランチを！', icon: '🏁' },
      toast: '🏁 Boloダイニング送客共通クーポンを発行しました（QRコード ＆ コード: #7842）',
      rationaleKey: 'gameover_dining'
    }
  },

  student_afternoon: {
    strike: {
      buttonLabel: '🎳 ストライク！',
      title: '🎳 STRIKE BONUS! 山盛りポテト2倍増量（無料）',
      desc: 'ストライク達成！お好きなフレーバーで今すぐ増量中！',
      icon: '🍟',
      typeClass: 'type-special',
      isNonImmediate: false,
      discount: 300,
      actionText: 'ポテト増量で注文',
      overhead: { title: 'STRIKE!', sub: 'ナイスストライク！ポテト増量チャンス！', icon: '🍟' },
      toast: '🎳 ストライク達成！山盛りポテト2倍増量特典が付与されました',
      rationaleKey: 'strike'
    },
    turkey: {
      buttonLabel: '🔥 ターキー達成！',
      title: '🔥 ターキー達成記念！メガフロート全員分無料サービス',
      desc: '偉業達成！グループ全員にメガフロートをプレゼント！',
      icon: '🥤',
      typeClass: 'type-special',
      isNonImmediate: false,
      discount: 550,
      note: '本端末限定・発行から30分間のみ有効です。',
      actionText: 'メガフロートを適用',
      overhead: { title: '🔥 TURKEY BONUS! 🔥', sub: '3連続ストライク！メガフロート無料！', icon: '🥤' },
      toast: '🔥 ターキー達成！メガフロート全員分無料特典を付与しました',
      rationaleKey: 'turkey'
    },
    zoro_easteregg: {
      buttonLabel: '🎰 ゾロ目 (111点)',
      title: '🎰 【イースターエッグ】奇跡のゾロ目フィーバー (111点達成！)',
      desc: '奇跡のゾロ目賞！『THE☆明太子パスタ 300円引き』',
      icon: '🎰',
      typeClass: 'type-easteregg',
      isNonImmediate: false,
      discount: 300,
      note: '偶然の幸運を称えるシークレット特典です。',
      actionText: 'パスタ300円引で注文',
      overhead: { title: 'SLOT FEVER 111!', sub: '奇跡のゾロ目達成！ラッキーフィーバー！', icon: '🎰' },
      toast: '🎰 ゾロ目イースターエッグが発動しました！',
      rationaleKey: 'zoro_easteregg'
    },
    just_easteregg: {
      buttonLabel: '🎯 ピタリ賞 (100点)',
      title: '🎯 【イースターエッグ】ジャストピタリ賞 (ぴったり100点達成！)',
      desc: 'ぴったり100点達成！『フライドポテト 2倍増量（無料）』',
      icon: '🎯',
      typeClass: 'type-easteregg',
      isNonImmediate: false,
      discount: 300,
      note: '日替わりシークレットイースターエッグです。',
      actionText: 'ポテト増量で注文',
      overhead: { title: 'JUST 100 PTS!', sub: 'ぴったりキリ番ピタリ賞！', icon: '🎯' },
      toast: '🎯 ピタリ賞イースターエッグが発動しました！',
      rationaleKey: 'just_easteregg'
    },
    date_easteregg: {
      buttonLabel: '📅 日付スコア (129点)',
      title: '🎉 【本日限定イースターエッグ】日付賞 (12/9 ➔ 129点達成！)',
      desc: '本日プレイ日 [12月9日] とスコアが一致！『生搾りモンブランCAKE 200円引き』',
      icon: '📅',
      typeClass: 'type-easteregg',
      isNonImmediate: false,
      discount: 200,
      note: '本特典は本日日付限定の特別イースターエッグです。条件は日替わりで変化します。',
      actionText: 'モンブラン200円引で注文',
      overhead: { title: 'SECRET EASTER EGG!', sub: '本日限定 [12月9日＝129点] ピタリ的中！', icon: '🎉' },
      toast: '📅 日付連動イースターエッグを発見しました！',
      rationaleKey: 'date_easteregg'
    },
    gameover_dining: {
      buttonLabel: '🏁 2ゲーム終了 (送客)',
      title: '🏁 【放課後学割特典】Bolo ダイニング送客クーポン',
      desc: 'ボウリング後の打ち上げに！Boloレストラン席にて『ソフトドリンクバー無料 / お食事10%OFF』',
      icon: '🍕',
      typeClass: 'type-dining',
      isNonImmediate: true,
      voucherCode: '5512',
      note: 'Boloのレジにて画面のQRコード読み取りまたは番号 [#5512] をご提示ください。',
      overhead: { title: 'GAME OVER - BOLO VOUCHER', sub: '放課後打ち上げ！Boloでドリンクバー無料！', icon: '🍕' },
      toast: '🏁 放課後学割Boloダイニング送客クーポンを発行しました（コード: #5512）',
      rationaleKey: 'gameover_dining'
    }
  },

  adult_evening: {
    strike: {
      buttonLabel: '🎳 ストライク！',
      title: '🎳 STRIKE BONUS! 生ビール・ハイボール1杯 200円引',
      desc: '乾杯ドリンクに使える即時割引クーポンが付与されました。',
      icon: '🍻',
      typeClass: 'type-special',
      isNonImmediate: false,
      discount: 200,
      actionText: 'ドリンク割引で注文',
      overhead: { title: 'STRIKE!', sub: '乾杯！生ビール・ハイボール割引！', icon: '🍺' },
      toast: '🎳 ストライク達成！生ビール割引特典が付与されました',
      rationaleKey: 'strike'
    },
    turkey: {
      buttonLabel: '🔥 ターキー達成！',
      title: '🔥 ターキー達成記念！プレミアム生ビール半額 / タパス盛り合わせ進呈',
      desc: '偉業達成！このレーン限定・30分以内有効の特別プレミアム特典です！',
      icon: '👑',
      typeClass: 'type-special',
      isNonImmediate: false,
      discount: 400,
      note: '本端末限定・発行から30分間のみ有効です。',
      actionText: 'プレミアム特典を適用',
      overhead: { title: '🔥 TURKEY FEVER! 🔥', sub: '3連続ストライク！生ビール半額！', icon: '👑' },
      toast: '🔥 ターキー達成！生ビール半額＆タパス進呈特典を付与しました',
      rationaleKey: 'turkey'
    },
    zoro_easteregg: {
      buttonLabel: '🎰 ゾロ目 (111点)',
      title: '🎰 【イースターエッグ】奇跡のゾロ目フィーバー (111点達成！)',
      desc: '奇跡のゾロ目賞！『ルッコラと生ハムのピザ 300円引き』',
      icon: '🎰',
      typeClass: 'type-easteregg',
      isNonImmediate: false,
      discount: 300,
      note: '偶然の幸運を称えるシークレット特典です。',
      actionText: 'ピザ300円引で注文',
      overhead: { title: 'SLOT FEVER 111!', sub: '奇跡のゾロ目達成！ピザ割引！', icon: '🍕' },
      toast: '🎰 ゾロ目イースターエッグが発動しました！',
      rationaleKey: 'zoro_easteregg'
    },
    birthday_easteregg: {
      buttonLabel: '🎂 誕生月ボーナス',
      title: '🎂 【誕生月サプライズ】お誕生日おめでとうございます！',
      desc: '誕生月のご来店感謝！『乾杯用スパークリングワイン 1本プレゼント』',
      icon: '🍾',
      typeClass: 'type-easteregg',
      isNonImmediate: false,
      discount: 1200,
      note: 'お誕生月限定の特別おもてなし特典です。',
      actionText: 'スパークリングワインを注文',
      overhead: { title: 'HAPPY BIRTHDAY!', sub: '乾杯用スパークリングワイン進呈！', icon: '🍾' },
      toast: '🎂 誕生月サプライズクーポンが付与されました！',
      rationaleKey: 'birthday_easteregg'
    },
    gameover_dining: {
      buttonLabel: '🏁 2ゲーム終了 (送客)',
      title: '🏁 【二次会送客特典】隣接イタリアン Bolo バル優待クーポン',
      desc: 'ボウリング後の二次会に！Boloレストラン席にて『おつまみタパス1品サービス / お会計10%OFF』',
      icon: '🍷',
      typeClass: 'type-dining',
      isNonImmediate: true,
      voucherCode: '9034',
      note: 'Boloのレジにて画面のQRコード読み取りまたは番号 [#9034] をご提示ください。',
      overhead: { title: '2 GAMES COMPLETED', sub: 'ボウリングの後はBoloで二次会へ！', icon: '🍷' },
      toast: '🏁 Boloバル二次会送客クーポンを発行しました（コード: #9034）',
      rationaleKey: 'gameover_dining'
    }
  },

  family_weekend: {
    strike: {
      buttonLabel: '🎳 ストライク！',
      title: '🎳 STRIKE BONUS! ファミリーシェアピザ 300円引',
      desc: 'ストライク達成！家族でシェアできるピザが300円引き！',
      icon: '🍕',
      typeClass: 'type-special',
      isNonImmediate: false,
      discount: 300,
      actionText: 'シェアピザ割引で注文',
      overhead: { title: 'STRIKE!', sub: 'パパ・ママ・キッズも大喜び！シェアピザ割引！', icon: '🍕' },
      toast: '🎳 ストライク達成！ファミリーシェアピザ割引が付与されました',
      rationaleKey: 'strike'
    },
    gutter: {
      buttonLabel: '💦 連続ガター（子ども救済）',
      title: '💦 (＞＜) どんまい！ナイスファイト賞！アイス100円引 ＆ 特製シール',
      desc: 'あきらめずに投げた君へ！CUPソフトまたはピスタチオアイスが100円引き！',
      icon: '🍦',
      typeClass: 'type-special',
      isNonImmediate: false,
      discount: 100,
      note: 'カウンタースタッフにお声がけで特製ガターシールもプレゼント！',
      actionText: 'アイス100円引で注文',
      overhead: { title: 'DONMAI!', sub: 'がんばったで賞！アイス100円引＋シール！', icon: '🍦' },
      toast: '💦 どんまい救済クーポンが発券されました（子どもの笑顔化）',
      rationaleKey: 'gutter'
    },
    date_easteregg: {
      buttonLabel: '📅 日付スコア (129点)',
      title: '🎉 【本日限定イースターエッグ】日付賞 (12/9 ➔ 129点達成！)',
      desc: '本日プレイ日 [12月9日] とスコアが一致！『ファミリーポテト 200円引き』',
      icon: '📅',
      typeClass: 'type-easteregg',
      isNonImmediate: false,
      discount: 200,
      note: '本特典は本日日付限定の特別イースターエッグです。条件は日替わりで変化します。',
      actionText: 'ポテト200円引で注文',
      overhead: { title: 'SECRET EASTER EGG!', sub: '本日限定 [12月9日＝129点] ピタリ的中！', icon: '🎉' },
      toast: '📅 日付連動イースターエッグを発見しました！',
      rationaleKey: 'date_easteregg'
    },
    birthday_easteregg: {
      buttonLabel: '🎂 誕生月ボーナス',
      title: '🎂 【誕生月サプライズ】キッズお誕生日おめでとう！',
      desc: '誕生月のご来店感謝！『キッズプレート 無料プレゼント』',
      icon: '🎈',
      typeClass: 'type-easteregg',
      isNonImmediate: false,
      discount: 780,
      note: 'お誕生月限定の特別おもてなし特典です。',
      actionText: 'キッズプレートを注文',
      overhead: { title: 'HAPPY BIRTHDAY KIDS!', sub: 'キッズプレート無料プレゼント！', icon: '🎈' },
      toast: '🎂 誕生月サプライズクーポンが付与されました！',
      rationaleKey: 'birthday_easteregg'
    },
    gameover_dining: {
      buttonLabel: '🏁 2ゲーム終了 (送客)',
      title: '🏁 【ファミリー特典】隣接イタリアン Bolo ランチ送客クーポン',
      desc: 'ボウリングお疲れ様でした！隣接レストラン席にて『キッズドリンク全員無料 / お食事10%OFF』',
      icon: '👨‍👩‍👧',
      typeClass: 'type-dining',
      isNonImmediate: true,
      voucherCode: '3341',
      note: 'Boloのレジにて画面のQRコード読み取りまたは番号 [#3341] をご提示ください。',
      overhead: { title: 'FAMILY TIME IN BOLO', sub: 'ゲームの後は家族でBoloランチへ！', icon: '🍝' },
      toast: '🏁 ファミリーBoloダイニング送客クーポンを発行しました（コード: #3341）',
      rationaleKey: 'gameover_dining'
    }
  }
};

// --- Menus Definition by Time Slot ---
const MENUS = {
  senior_lunch: {
    recommended: [
      { id: 'l1', name: "Bolo'sボロネーゼ ＆ サラダセット", price: 1380, icon: '🍝', tag: '人気No.1', desc: '一番人気ボロネーゼに地元野菜サラダとドリンク付き' },
      { id: 'l2', name: '天使のクリームスープパスタ', price: 1420, icon: '🍲', tag: 'シニア推薦', desc: '濃厚かつ優しい味わいのスープ仕立て生パスタ' },
      { id: 'l3', name: '大人のわがままハーフランチプレート', price: 1580, icon: '🍽️', tag: '限定', desc: 'ハーフパスタ＋ミニオムレツ＋こだわり前菜3種' },
      { id: 'l4', name: 'Bolo特製 挽きたてドリップ珈琲', price: 450, icon: '☕', tag: '食後に', desc: 'ボウリング後のクールダウンに最適な香り高い珈琲' }
    ],
    food: [
      { id: 'f1', name: '肉汁ハンバーグタリアッテレ', price: 1680, icon: '🥩', tag: '', desc: '自家製ハンバーグを崩して食べる濃厚パスタ' },
      { id: 'f2', name: '静岡県産シラスと大葉の和風パスタ', price: 1280, icon: '🍝', tag: '地元食材', desc: '駿河湾産シラスをたっぷり使ったあっさり仕立て' },
      { id: 'f3', name: 'クワトロフォルマッジ（ピザ）', price: 1850, icon: '🍕', tag: 'シェア', desc: '4種のイタリア産チーズと蜂蜜の贅沢ピザ' }
    ],
    snack: [
      { id: 's1', name: "Bolo'sフレッシュサラダ", price: 680, icon: '🥗', tag: 'ヘルシー', desc: 'シャキシャキ地元野菜の特製イタリアンドレッシング' },
      { id: 's2', name: 'トリュフ香る贅沢オムレツ', price: 880, icon: '🍳', tag: '人気', desc: 'ふわとろ卵とトリュフオイルの香り' }
    ],
    dessert: [
      { id: 'd1', name: 'イタリアンティラミス', price: 680, icon: '🍰', tag: '定番', desc: 'マスカルポーネとエスプレッソの本格ドルチェ' },
      { id: 'd2', name: 'ピスタチオジェラート', price: 520, icon: '🍨', tag: '', desc: '濃厚なピスタチオの香りと滑らかな口どけ' }
    ],
    drink: [
      { id: 'dr1', name: 'ホットカフェラテ', price: 500, icon: '☕', tag: '', desc: 'まろやかなスチームミルク' },
      { id: 'dr2', name: 'アイスジャスミンティー', price: 420, icon: '🥤', tag: '', desc: 'すっきり爽やかな後味' }
    ]
  },
  student_afternoon: {
    recommended: [
      { id: 'st1', name: '山盛りフライドポテト（2倍増量）', price: 680, icon: '🍟', tag: 'グループ得', desc: '選べるフレーバー（トリュフ塩・コンソメ・バター醤油）' },
      { id: 'st2', name: '生搾りモンブランCAKE', price: 850, icon: '🌰', tag: 'SNS映え', desc: '目の前で絞る贅沢和栗ペーストの映えスイーツ' },
      { id: 'st3', name: '濃厚ショコラパンク', price: 780, icon: '🍫', tag: '甘党必見', desc: '温かいとろけるフォンダンショコラ' },
      { id: 'st4', name: 'メガフロート（メロンソーダ / コーラ）', price: 550, icon: '🥤', tag: 'メガサイズ', desc: '大盛りバニラアイス乗せ' }
    ],
    food: [
      { id: 'sf1', name: 'マリナーラ＆ポテトセット', price: 1180, icon: '🍕', tag: '学割', desc: '焼きたてピザとポテトのお得なセット' },
      { id: 'sf2', name: 'THE☆明太子パスタ', price: 1080, icon: '🍝', tag: '人気', desc: '明太子とバターの黄金比' }
    ],
    snack: [
      { id: 'ss1', name: 'チキンナゲット＆ポテトBOX', price: 820, icon: '🍗', tag: 'シェア', desc: 'サクサクナゲット10個入り' },
      { id: 'ss2', name: '揚げたてシナモンチュロス', price: 480, icon: '🥖', tag: '', desc: 'チョコディップ付き' }
    ],
    dessert: [
      { id: 'sd1', name: 'バスクチーズケーキ', price: 680, icon: '🍰', tag: '', desc: '焦がしカラメル香るしっとりケーキ' },
      { id: 'sd2', name: 'アフォガード', price: 580, icon: '☕', tag: '', desc: 'バニラアイスに熱々エスプレッソ' }
    ],
    drink: [
      { id: 'sdr1', name: 'アイスココア（ホイップのせ）', price: 480, icon: '🧋', tag: '', desc: '濃厚ミルクココア' },
      { id: 'sdr2', name: 'ソフトドリンクバー（放課後割）', price: 380, icon: '🥤', tag: '飲み放題', desc: '全12種フリードリンク' }
    ]
  },
  adult_evening: {
    recommended: [
      { id: 'ad1', name: 'プレミアム生ビール（静岡麦酒）', price: 680, icon: '🍺', tag: '乾杯', desc: 'きめ細やかな泡とキレのある喉越し' },
      { id: 'ad2', name: 'ルッコラと生ハムの焼きたてピザ', price: 1780, icon: '🍕', tag: 'おつまみ', desc: 'パルマ産プロシュートを贅沢にトッピング' },
      { id: 'ad3', name: 'カラマーリ（イカ）のフリット', price: 780, icon: '🦑', tag: 'ビール泥棒', desc: 'レモンを絞って熱々サクサクで' },
      { id: 'ad4', name: 'スモークナッツ＆熟成チーズ盛り', price: 850, icon: '🧀', tag: 'ワインに', desc: 'ボウリングしながら片手でつまめる' }
    ],
    food: [
      { id: 'af1', name: '肉汁ハンバーグタリアッテレ', price: 1680, icon: '🥩', tag: '〆の一品', desc: 'シェアにも最適な満足ボリューム' },
      { id: 'af2', name: '石焼きチーズリゾット', price: 1480, icon: '🍲', tag: '熱々', desc: 'パルミジャーノを目の前で削るリゾット' }
    ],
    snack: [
      { id: 'as1', name: 'トリュフ塩フレンチフライ', price: 680, icon: '🍟', tag: '大人気', desc: '黒トリュフの香りとパルメザン' },
      { id: 'as2', name: '静岡県産シラスのオムレツ', price: 880, icon: '🍳', tag: '名物', desc: 'ふわふわ卵とお出汁の旨味' }
    ],
    dessert: [
      { id: 'ad_d1', name: 'アフォガード＆リキュール', price: 750, icon: '☕', tag: '大人デザート', desc: 'アマレットリキュールが香る' }
    ],
    drink: [
      { id: 'adr1', name: '角ハイボール / ジンジャーハイ', price: 580, icon: '🥃', tag: '', desc: '強炭酸スッキリハイボール' },
      { id: 'adr2', name: 'キールロワイヤル', price: 750, icon: '🍸', tag: 'カクテル', desc: 'カシスとスパークリングワイン' }
    ]
  },
  family_weekend: {
    recommended: [
      { id: 'fam1', name: 'ファミリーシェアピザ（クワトロ＆マルゲ）', price: 1980, icon: '🍕', tag: '大人気', desc: '子ども大好きマルゲリータとクワトロのハーフ＆ハーフ' },
      { id: 'fam2', name: 'CUPソフト（選べるトッピング）', price: 380, icon: '🍦', tag: 'キッズ定番', desc: 'チョコソース or キャラメル or ベリー' },
      { id: 'fam3', name: 'わいわいキッズプレート', price: 780, icon: '🍱', tag: 'おもちゃ付', desc: 'ミニハンバーグ、ポテト、ナゲット、ジュース' },
      { id: 'fam4', name: 'フライドポテトファミリーバスケット', price: 780, icon: '🍟', tag: '大盛り', desc: '通常の3倍ボリューム' }
    ],
    food: [
      { id: 'ff1', name: "Bolo'sボロネーゼ（大盛り）", price: 1480, icon: '🍝', tag: 'シェア', desc: '家族で取り分けできるたっぷりパスタ' }
    ],
    snack: [
      { id: 'fs1', name: 'チキンナゲットBOX（15個）', price: 950, icon: '🍗', tag: 'シェア', desc: 'BBQソース＆マスタード付き' }
    ],
    dessert: [
      { id: 'fd1', name: 'ピスタチオジェラート', price: 520, icon: '🍨', tag: '', desc: '大人のご褒美スイーツ' }
    ],
    drink: [
      { id: 'fdr1', name: '100%オレンジジュース（ピッチャー）', price: 680, icon: '🧃', tag: 'ファミリー', desc: '家族3〜4杯分' }
    ]
  }
};

// --- Strategy Rationale Templates ---
const RATIONALE_TEMPLATES = {
  default: {
    title: '通常コンテキスト（時間帯別メニュー最適化）',
    trigger: '現在の時間帯・客層プロファイルに応じた自動切り替え',
    type: '時間帯別ダイナミック・メニュー',
    intent: '一日中同じメニューを提示するのではなく、客層の来店動機（昼シニアのランチ、夕方学生のスナック、夜社会人のバル）に合わせた最適な商品を最上段に配置し、注文決定までの心理的ハードルを下げます。',
    antiFraud: 'レーン常設の専用タブレットのため、注文は該当レーンに紐づき誤注文や不正は発生しません。',
    uxSafeguard: 'メニュー画面上部に現在の時間帯テーマ（「昼の健康ランチ」等）を明示し、自然な納得感を与えます。',
    arpuImpact: '+20% 〜 +30%（適切なメニュー提案による注文率UP）',
    csImpact: '4.7 / 5.0（欲しいものがすぐ見つかる快適性）'
  },
  strike: {
    title: 'ストライク達成トリガー（即時インセンティブ）',
    trigger: '投球でストライクを達成',
    type: '特殊クーポン（レーン端末直結・即時消費型）',
    intent: 'ストライクが出た瞬間の高揚感を逃さず、客層に合った特典（学生にはポテト増量、大人にはドリンク割引等）をタブレットに即座にプッシュし、ゲーム中の即時注文（アップセル）に直結させます。',
    antiFraud: '【物理的端末直結】レーン端末のカートに自動付与されるため、他レーンへのコード横流し・不正利用が100%不可能です。',
    uxSafeguard: '「🎳 STRIKE BONUS!」と画面上で祝福演出を行い、ゲーム体験とフード注文をポジティブに結合します。',
    arpuImpact: '+500円〜+800円 / レーン（追加注文の誘発）',
    csImpact: '4.9 / 5.0（投球の喜びが特典になるエンタメ性）'
  },
  turkey: {
    title: 'ターキー（3連続ストライク）達成トリガー',
    trigger: '3連続ストライク（ターキー）達成',
    type: 'プレミアム特殊クーポン（レーン端末直結・30分限定）',
    intent: '極めて達成難度の高いターキーを称え、高単価特典（生ビール1杯半額、限定ドルチェ割引など）を付与。仲間内での歓声と祝杯注文を喚起します。',
    antiFraud: '【端末直結 ＋ 30分時限消滅】該当レーン限定かつ30分で失効するため、後日の使い回しやスクショ共有リスクを完全ガード。',
    uxSafeguard: '頭上モニターとタブレットが連動してド派手なターキー演出を展開し、達成感を最高潮に高めます。',
    arpuImpact: '+1,000円以上（グループ全体の乾杯・追加注文）',
    csImpact: '5.0 / 5.0（最高峰の達成感とサプライズ）'
  },
  gutter: {
    title: '連続ガター（子ども・初心者）救済トリガー',
    trigger: '2連続ガター または 最終スコア50点未満',
    type: '隠し救済クーポン（レーン端末直結・お慰め演出）',
    intent: '子どもがガターで泣き出したり、初心者が落胆するペインを解消。「がんばったで賞！」としてアイス100円引やキャラクターシールを進呈し、悔しさを笑顔に変えます。',
    antiFraud: '端末直結により、その場で子どもを連れた保護者がタブレットをタップするだけで利用可能。',
    uxSafeguard: '「(＞＜) どんまい！ナイスファイト賞！」と可愛いキャラクターが慰める演出で、親の気まずさや子どもの不機嫌を即座に和らげます。',
    arpuImpact: 'デザート併売による＋380円 ＆ ファミリーの再訪意向（LTV）大幅向上',
    csImpact: '4.9 / 5.0（親からの感謝と信頼の獲得）'
  },
  date_easteregg: {
    title: '【イースターエッグ】日付連動スコア（12/9 ➔ 129点）',
    trigger: 'プレイ日（12月9日）とスコア（129点）が完全一致',
    type: '日替わりシークレット・イースターエッグ',
    intent: '偶然のスコア一致を祝うサプライズ。予期せぬボーナスが体験の特別感を一気に引き上げ、SNSでの口コミやスイーツ注文を促します。',
    antiFraud: 'レーン端末限定付与。条件は日替わりで変動するためパターンの悪用が不可能。',
    uxSafeguard: '【不満防止の最重要UX】「※本日 [12/9] 限定の日替わりシークレットです。日によって条件は変わります」と明記し、別日に同じ点数で出なくても不満を持たれない設計を徹底。',
    arpuImpact: '+680円（スイーツ注文） ＆ SNSでのバズ（UGC拡散）',
    csImpact: '4.8 / 5.0（予想外のラッキーによる満足度急上昇）'
  },
  zoro_easteregg: {
    title: '【イースターエッグ】奇跡のゾロ目スコア（111点 / 222点）',
    trigger: 'トータルスコアがゾロ目（111点）を達成',
    type: 'ラッキー・イースターエッグ',
    intent: 'カジノのスロットのようなフィーバー演出でグループ全員を盛り上げ、生パスタやシェアピザの割引を提案します。',
    antiFraud: '端末直結型。1タップでその場の注文に即座に反映。',
    uxSafeguard: '「🎰 奇跡のゾロ目フィーバー！」と偶然性を強調し、実力に関係なく誰でも楽しめるイースターエッグとして位置づけ。',
    arpuImpact: '+1,200円（シェア料理の追加注文）',
    csImpact: '4.8 / 5.0（偶然の盛り上がり体験）'
  },
  just_easteregg: {
    title: '【イースターエッグ】ジャストピタリ賞（ぴったり100点）',
    trigger: 'トータルスコアがぴったり100点',
    type: 'ジャストピタリ・イースターエッグ',
    intent: 'ぴったりキリ番の気持ちよさを特典化。山盛りポテト増量などを付与してシェアを促します。',
    antiFraud: 'レーン端末限定付与。',
    uxSafeguard: '「🎯 ジャストピタリ賞！」と明記し、次回来店時へのゲーム性の期待感を高めます。',
    arpuImpact: '+680円 / レーン',
    csImpact: '4.7 / 5.0'
  },
  birthday_easteregg: {
    title: '誕生月サプライズボーナス',
    trigger: '会員登録の誕生月来店',
    type: 'パーソナライズ・イースターエッグ',
    intent: '誕生月に来店してくれた顧客を特別扱いし、生搾りモンブランCAKEやデザートプレートをプレゼント/優待。ロイヤルティを強固にします。',
    antiFraud: '会員情報紐づけ。',
    uxSafeguard: '「🎂 お誕生日おめでとうございます！」とお祝いのメッセージをモニターとタブレット両面で展開。',
    arpuImpact: '同行者の飲食注文を巻き込み＋2,000円〜＋3,000円',
    csImpact: '5.0 / 5.0（極めて高いロイヤルティ形成）'
  },
  gameover_dining: {
    title: '2ゲーム終了・Boloダイニング送客トリガー',
    trigger: '規定ゲーム（2ゲーム）を完投し精算へ',
    type: '共通クーポン（隣接イタリアンダイニング Bolo送客用）',
    intent: '投球終了後の空腹・クールダウン需要を逃さず、隣接レストラン「Bolo」のテーブル席へ誘導。珈琲無料やランチ/ディナー10%OFFで確実に着席させます。',
    antiFraud: '【共有・コピー大歓迎モデル】Boloのテーブル席に着席して客単価1,500〜3,000円が発生するため、誰が使っても店舗側に確実に大きな粗利が残ります。',
    uxSafeguard: '頭上モニターにQRコードと大きな4桁番号を表示。スマホ操作が苦手なシニアもレジで番号を言うだけでスムーズに利用できます。',
    arpuImpact: '+1,500円〜+2,500円 / 人（ダイニング併用による施設ARPU爆発的向上）',
    csImpact: '4.9 / 5.0（運動後に美味しい食事ができる完璧なルーティン）'
  }
};

// --- QR Code Helper ---
function generateQRCode(elementId, text, size = 72) {
  const container = document.getElementById(elementId);
  if (!container) return;
  container.innerHTML = '';

  if (typeof QRCode !== 'undefined') {
    try {
      new QRCode(container, {
        text: text,
        width: size,
        height: size,
        colorDark: "#0f172a",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
      return;
    } catch (e) {
      console.warn("QRCode error:", e);
    }
  }

  // Fallback image
  const img = document.createElement('img');
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&margin=0`;
  img.alt = 'QR Code';
  img.width = size;
  img.height = size;
  container.appendChild(img);
}

// --- Official Bowling Score Calculation Engine ---
function calculateBowlingScore(player) {
  if (!player.frames) player.frames = Array.from({ length: 10 }, () => ({ rolls: [] }));

  // Collect chronological rolls with metadata
  const allRolls = [];
  player.frames.forEach((f, fIdx) => {
    f.rolls.forEach(r => allRolls.push({ roll: r, frameIdx: fIdx }));
  });

  let rollIdx = 0;
  let runningTotal = 0;
  const frameTotals = [];

  for (let f = 0; f < 10; f++) {
    const frame = player.frames[f] || { rolls: [] };
    const r1 = frame.rolls[0];

    if (f < 9) { // Frames 1 to 9
      if (r1 === undefined) {
        frameTotals.push(null);
        continue;
      }

      if (r1 === 10) { // Strike
        const next1 = allRolls[rollIdx + 1]?.roll;
        const next2 = allRolls[rollIdx + 2]?.roll;
        rollIdx += 1;
        if (next1 !== undefined && next2 !== undefined) {
          runningTotal += 10 + next1 + next2;
          frameTotals.push(runningTotal);
        } else {
          frameTotals.push(null); // Waiting for subsequent rolls
        }
      } else {
        const r2 = frame.rolls[1];
        if (r2 === undefined) {
          rollIdx += 1;
          frameTotals.push(null);
        } else if (r1 + r2 === 10) { // Spare
          const next1 = allRolls[rollIdx + 2]?.roll;
          rollIdx += 2;
          if (next1 !== undefined) {
            runningTotal += 10 + next1;
            frameTotals.push(runningTotal);
          } else {
            frameTotals.push(null);
          }
        } else { // Open frame
          runningTotal += r1 + r2;
          rollIdx += 2;
          frameTotals.push(runningTotal);
        }
      }
    } else { // 10th Frame
      if (frame.rolls.length === 0) {
        frameTotals.push(null);
      } else {
        const frameSum = frame.rolls.reduce((sum, r) => sum + r, 0);
        const r2 = frame.rolls[1];
        const isComplete = (r1 < 10 && (r1 + (r2 || 0) < 10) && frame.rolls.length >= 2) || (frame.rolls.length === 3);
        if (isComplete) {
          runningTotal += frameSum;
          frameTotals.push(runningTotal);
        } else {
          frameTotals.push(runningTotal + frameSum);
        }
      }
    }
  }

  // Calculate final total (either last calculated total or sum of all available pins)
  const validTotals = frameTotals.filter(t => t !== null);
  const total = validTotals.length > 0 ? validTotals[validTotals.length - 1] : 0;

  return { frameTotals, total };
}

// --- Action Buttons Dynamic Filter per Customer Segment ---
function updateActionButtons() {
  const currentRules = SEGMENT_EVENT_RULES[state.preset] || {};
  const buttons = document.querySelectorAll('#action-buttons-group .action-btn');
  let activeCount = 0;

  buttons.forEach(btn => {
    const actionKey = btn.dataset.action;
    if (actionKey === 'reset') {
      btn.style.display = 'inline-flex';
      btn.disabled = false;
      return;
    }

    const rule = currentRules[actionKey];
    if (rule) {
      btn.style.display = 'inline-flex';
      btn.disabled = false;
      btn.classList.remove('btn-inactive');
      if (rule.buttonLabel) {
        btn.innerText = rule.buttonLabel;
      }
      activeCount++;
    } else {
      btn.style.display = 'none';
      btn.disabled = true;
      btn.classList.add('btn-inactive');
    }
  });

  const countTag = document.getElementById('sim-actions-count');
  if (countTag) {
    const slotName = PRESETS[state.preset]?.timeSlotName || '客層';
    countTag.innerText = `発火可能: ${activeCount}種 (${slotName})`;
  }
}

// --- Core UI Update Functions ---

function init() {
  bindEvents();
  applyPreset('senior_lunch');
}

function bindEvents() {
  // Preset Buttons
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const presetKey = btn.dataset.preset;
      applyPreset(presetKey);
    });
  });

  // Date and Time change
  document.getElementById('date-select').addEventListener('change', (e) => {
    state.date = e.target.value;
    updateDateDisplay();
  });

  document.getElementById('time-select').addEventListener('change', (e) => {
    state.time = e.target.value;
    handleManualTimeChange(state.time);
  });

  // Player count toggle
  document.querySelectorAll('.count-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const count = parseInt(btn.dataset.count, 10);
      setPlayerCount(count);
    });
  });

  // Category Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeTab = btn.dataset.category;
      renderMenu();
    });
  });

  // Simulation Action Buttons (shortcuts)
  document.querySelectorAll('#action-buttons-group .action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action === 'reset') {
        resetSimulation();
      } else if (action) {
        triggerAction(action);
      }
    });
  });

  // Undo and Clear Buttons
  document.getElementById('btn-undo-shot').addEventListener('click', () => undoLastRoll());
  document.getElementById('btn-clear-game').addEventListener('click', () => clearGameScores());

  // Order submit
  document.getElementById('btn-submit-order').addEventListener('click', () => submitOrder());
}

function applyPreset(presetKey) {
  state.preset = presetKey;
  const p = PRESETS[presetKey];

  // Update UI buttons
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.preset === presetKey);
  });

  // Update State
  state.time = p.time;
  state.playerCount = p.playerCount;
  state.players = JSON.parse(JSON.stringify(p.players));
  state.activeCoupon = null;
  state.cart = [];
  state.activeAction = 'default';

  // Ensure all players have full frames structure
  state.players.forEach(player => {
    if (!player.frames) {
      player.frames = Array.from({ length: 10 }, () => ({ rolls: [] }));
    }
  });

  // Set input cursor to the first uncompleted frame / end
  findNextInputPosition();

  // Update Inputs
  document.getElementById('date-select').value = state.date;
  document.getElementById('time-select').value = p.time;
  document.getElementById('tablet-time-tag').innerText = p.timeTag;
  document.getElementById('tablet-clock').innerText = p.time;
  document.getElementById('monitor-clock').innerText = p.time + ' AM';

  // Update Player count buttons
  document.querySelectorAll('.count-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.count, 10) === state.playerCount);
  });

  // Update available action buttons for this segment
  updateActionButtons();

  // Re-render
  renderScoreboard();
  renderPinKeypad();
  renderMenu();
  renderPushCoupon();
  renderOverheadMonitor('READY TO BOWL', '投球してください', '🎳');
  renderRationale('default');
  updateCartUI();
}

function setPlayerCount(count) {
  state.playerCount = count;
  document.querySelectorAll('.count-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.count, 10) === count);
  });

  // Adjust player array
  const basePlayers = PRESETS[state.preset].players;
  state.players = [];
  for (let i = 0; i < count; i++) {
    if (basePlayers[i]) {
      state.players.push(JSON.parse(JSON.stringify(basePlayers[i])));
    } else {
      state.players.push({
        name: `プレイヤー ${i + 1}`,
        tag: '一般',
        frames: [
          { rolls: [8, 1] },
          { rolls: [9, 1] },
          { rolls: [10] },
          { rolls: [7, 2] },
          { rolls: [8, 2] },
          { rolls: [9, 0] },
          { rolls: [8, 1] },
          { rolls: [9, 1] },
          { rolls: [8, 1] },
          { rolls: [9, 0] }
        ]
      });
    }
  }

  findNextInputPosition();
  renderScoreboard();
  renderPinKeypad();
  renderMenu();
  renderPushCoupon();
  showToast(`👥 登録人数を ${count}名 に変更しました`, 'toast-success');
}

function handleManualTimeChange(timeVal) {
  state.time = timeVal;
  document.getElementById('tablet-clock').innerText = timeVal;
  document.getElementById('monitor-clock').innerText = timeVal;

  if (timeVal.startsWith('11') || timeVal.startsWith('12') || timeVal.startsWith('13')) {
    state.preset = 'senior_lunch';
    document.getElementById('tablet-time-tag').innerText = '昼の健康ランチタイム';
  } else if (timeVal.startsWith('14')) {
    state.preset = 'senior_lunch';
    document.getElementById('tablet-time-tag').innerText = '谷間時間（カフェ＆デザート）';
  } else if (timeVal.startsWith('15') || timeVal.startsWith('16') || timeVal.startsWith('17')) {
    state.preset = 'student_afternoon';
    document.getElementById('tablet-time-tag').innerText = '放課後カフェ＆スナックタイム';
  } else {
    state.preset = 'adult_evening';
    document.getElementById('tablet-time-tag').innerText = 'ナイトボウリング＆バルタイム';
  }

  updateActionButtons();
  renderMenu();
  renderRationale(state.activeAction);
}

function updateDateDisplay() {
  const parts = state.date.split('-');
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  const targetScore = `${month}${day < 10 ? '0' + day : day}`;
  
  const dateBtn = document.getElementById('btn-date');
  if (dateBtn) {
    dateBtn.innerText = `📅 日付スコア (${month}/${day} ➔ ${targetScore}点)`;
  }
}

// --- Scoreboard Rendering & Active Highlight ---

function renderScoreboard() {
  const tbody = document.getElementById('scoreboard-body');
  tbody.innerHTML = '';

  state.players.forEach((p, pIdx) => {
    const { frameTotals, total } = calculateBowlingScore(p);
    p.total = total;

    const tr = document.createElement('tr');
    const isPlayerActive = pIdx === state.currentInput.playerIndex;

    // Player name cell
    const tdPlayer = document.createElement('td');
    tdPlayer.className = `player-name-cell ${isPlayerActive ? 'active-player-cell' : ''}`;
    tdPlayer.innerHTML = `
      <span class="p-name">${p.name}</span>
      <span class="p-tag">${p.tag}</span>
    `;
    tdPlayer.addEventListener('click', () => {
      state.currentInput.playerIndex = pIdx;
      findNextInputPositionForPlayer(pIdx);
      renderScoreboard();
      renderPinKeypad();
    });
    tr.appendChild(tdPlayer);

    // 10 Frames
    for (let f = 0; f < 10; f++) {
      const frame = p.frames[f] || { rolls: [] };
      const tdFrame = document.createElement('td');
      const isFrameActive = isPlayerActive && f === state.currentInput.frameIndex;
      tdFrame.className = `frame-cell ${isFrameActive ? 'active-frame' : ''}`;

      // Format shot marks
      let shot1Html = '';
      let shot2Html = '';
      let shot3Html = '';

      const r1 = frame.rolls[0];
      const r2 = frame.rolls[1];
      const r3 = frame.rolls[2];

      if (f < 9) { // Frames 1 to 9
        if (r1 !== undefined) {
          if (r1 === 10) {
            shot1Html = `<span class="shot strike">X</span>`;
            shot2Html = `<span class="shot"></span>`;
          } else {
            shot1Html = `<span class="shot ${r1 === 0 ? 'gutter' : ''}">${r1 === 0 ? 'G' : r1}</span>`;
            if (r2 !== undefined) {
              if (r1 + r2 === 10) {
                shot2Html = `<span class="shot spare">/</span>`;
              } else {
                shot2Html = `<span class="shot ${r2 === 0 ? 'gutter' : ''}">${r2 === 0 ? 'G' : r2}</span>`;
              }
            } else {
              shot2Html = `<span class="shot ${isFrameActive && state.currentInput.shotIndex === 1 ? 'active-shot' : ''}"></span>`;
            }
          }
        } else {
          shot1Html = `<span class="shot ${isFrameActive && state.currentInput.shotIndex === 0 ? 'active-shot' : ''}"></span>`;
          shot2Html = `<span class="shot"></span>`;
        }
      } else { // 10th Frame
        if (r1 !== undefined) {
          shot1Html = `<span class="shot ${r1 === 10 ? 'strike' : r1 === 0 ? 'gutter' : ''}">${r1 === 10 ? 'X' : r1 === 0 ? 'G' : r1}</span>`;
          if (r2 !== undefined) {
            if (r1 < 10 && r1 + r2 === 10) {
              shot2Html = `<span class="shot spare">/</span>`;
            } else {
              shot2Html = `<span class="shot ${r2 === 10 ? 'strike' : r2 === 0 ? 'gutter' : ''}">${r2 === 10 ? 'X' : r2 === 0 ? 'G' : r2}</span>`;
            }
            if (r3 !== undefined) {
              shot3Html = `<span class="shot ${r3 === 10 ? 'strike' : r3 === 0 ? 'gutter' : ''}">${r3 === 10 ? 'X' : r3 === 0 ? 'G' : r3}</span>`;
            } else {
              const allows3 = (r1 === 10 || r1 + r2 === 10);
              if (allows3) {
                shot3Html = `<span class="shot ${isFrameActive && state.currentInput.shotIndex === 2 ? 'active-shot' : ''}"></span>`;
              }
            }
          } else {
            shot2Html = `<span class="shot ${isFrameActive && state.currentInput.shotIndex === 1 ? 'active-shot' : ''}"></span>`;
          }
        } else {
          shot1Html = `<span class="shot ${isFrameActive && state.currentInput.shotIndex === 0 ? 'active-shot' : ''}"></span>`;
          shot2Html = `<span class="shot"></span>`;
        }
      }

      const frameTotalText = frameTotals[f] !== null && frameTotals[f] !== undefined ? frameTotals[f] : '';

      tdFrame.innerHTML = `
        <div class="frame-box">
          <div class="frame-shots">
            ${shot1Html}
            ${shot2Html}
            ${f === 9 ? (shot3Html || '<span class="shot"></span>') : ''}
          </div>
          <div class="frame-total">${frameTotalText}</div>
        </div>
      `;

      // Allow clicking on any frame to set active input
      tdFrame.addEventListener('click', () => {
        state.currentInput.playerIndex = pIdx;
        state.currentInput.frameIndex = f;
        state.currentInput.shotIndex = frame.rolls.length;
        if (f < 9 && frame.rolls[0] === 10) state.currentInput.shotIndex = 0; // Already strike
        renderScoreboard();
        renderPinKeypad();
      });

      tr.appendChild(tdFrame);
    }

    // Total Score Cell
    const tdTotal = document.createElement('td');
    tdTotal.className = 'col-total';
    tdTotal.innerText = total;
    tr.appendChild(tdTotal);

    tbody.appendChild(tr);
  });
}

// --- Pin Keypad Rendering & Interaction ---

function renderPinKeypad() {
  const grid = document.getElementById('pin-buttons-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const { playerIndex, frameIndex, shotIndex } = state.currentInput;
  const player = state.players[playerIndex];
  const frame = player ? (player.frames[frameIndex] || { rolls: [] }) : { rolls: [] };

  // Determine maximum available pins
  let maxPins = 10;
  let isSparePossible = false;
  let sparePins = -1;

  if (frameIndex < 9) {
    if (shotIndex === 1) {
      const r1 = frame.rolls[0] || 0;
      maxPins = 10 - r1;
      isSparePossible = true;
      sparePins = maxPins;
    }
  } else { // 10th Frame
    if (shotIndex === 1) {
      const r1 = frame.rolls[0] || 0;
      if (r1 < 10) {
        maxPins = 10 - r1;
        isSparePossible = true;
        sparePins = maxPins;
      } else {
        maxPins = 10;
      }
    } else if (shotIndex === 2) {
      const r1 = frame.rolls[0] || 0;
      const r2 = frame.rolls[1] || 0;
      if (r1 === 10 && r2 < 10) {
        maxPins = 10 - r2;
        isSparePossible = true;
        sparePins = maxPins;
      } else {
        maxPins = 10;
      }
    }
  }

  // Update Turn Info Header
  const playerNameEl = document.getElementById('current-player-name');
  const frameInfoEl = document.getElementById('current-frame-info');
  if (player && playerNameEl && frameInfoEl) {
    playerNameEl.innerText = player.name;
    frameInfoEl.innerText = `第${frameIndex + 1}フレーム (${shotIndex + 1}投目)`;
  }

  // Render 0 to 10 Pin Buttons
  for (let pin = 0; pin <= 10; pin++) {
    const btn = document.createElement('button');
    const isEnabled = pin <= maxPins;
    btn.className = 'pin-btn';
    btn.disabled = !isEnabled;

    let mainLabel = `${pin}`;
    let subLabel = `${pin}本`;

    if (pin === 0) {
      btn.classList.add('pin-gutter-btn');
      mainLabel = 'G';
      subLabel = 'ガター';
    } else if (pin === 10 && (shotIndex === 0 || (frameIndex === 9 && (frame.rolls[shotIndex - 1] === 10 || frame.rolls[0] + frame.rolls[1] === 10)))) {
      btn.classList.add('pin-strike-btn');
      mainLabel = 'X';
      subLabel = 'ストライク';
    } else if (isSparePossible && pin === sparePins) {
      btn.classList.add('pin-spare-btn');
      mainLabel = '/';
      subLabel = 'スペア';
    }

    btn.innerHTML = `
      <span>${mainLabel}</span>
      <span class="pin-sub">${subLabel}</span>
    `;

    btn.addEventListener('click', () => recordRoll(pin));
    grid.appendChild(btn);
  }
}

// --- Record Roll Action & Automated Event Triggering ---

function recordRoll(pins) {
  const { playerIndex, frameIndex, shotIndex } = state.currentInput;
  const player = state.players[playerIndex];
  if (!player) return;

  if (!player.frames[frameIndex]) {
    player.frames[frameIndex] = { rolls: [] };
  }

  // Insert or overwrite the roll
  player.frames[frameIndex].rolls[shotIndex] = pins;

  // --- Automated Event Triggers Detection ---
  checkAutomaticEventTriggers(player, pins, frameIndex, shotIndex);

  // Advance to next shot or player
  advanceTurn(pins);

  renderScoreboard();
  renderPinKeypad();
}

function checkAutomaticEventTriggers(player, pins, frameIndex, shotIndex) {
  const currentRules = SEGMENT_EVENT_RULES[state.preset] || {};

  // 1. Strike or Turkey Detection
  if (pins === 10) {
    let consecutiveStrikes = 0;
    for (let f = frameIndex; f >= 0; f--) {
      const fRolls = player.frames[f]?.rolls || [];
      if (fRolls.includes(10)) {
        consecutiveStrikes++;
      } else {
        break;
      }
    }

    if (consecutiveStrikes >= 3 && currentRules.turkey) {
      triggerAction('turkey');
      return;
    } else if (currentRules.strike) {
      triggerAction('strike');
      return;
    }
  }

  // 2. Gutter Detection (2 consecutive gutters)
  if (pins === 0) {
    const fRolls = player.frames[frameIndex]?.rolls || [];
    const prevRollInFrame = shotIndex > 0 ? fRolls[shotIndex - 1] : null;
    const prevFrameRolls = frameIndex > 0 ? player.frames[frameIndex - 1]?.rolls : [];
    const prevFrameLastRoll = prevFrameRolls?.length > 0 ? prevFrameRolls[prevFrameRolls.length - 1] : null;

    if ((prevRollInFrame === 0 || prevFrameLastRoll === 0) && currentRules.gutter) {
      triggerAction('gutter');
      return;
    }
  }

  // 3. Easter Egg Score Checks (Date, Zoro-me, Just 100)
  const { total } = calculateBowlingScore(player);
  const parts = state.date.split('-');
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  const targetDateScore = parseInt(`${month}${day < 10 ? '0' + day : day}`, 10);

  if (total === targetDateScore && currentRules.date_easteregg) {
    triggerAction('date_easteregg');
    return;
  } else if ((total === 111 || total === 222) && currentRules.zoro_easteregg) {
    triggerAction('zoro_easteregg');
    return;
  } else if (total === 100 && currentRules.just_easteregg) {
    triggerAction('just_easteregg');
    return;
  }

  // 4. Game Over (10th Frame completion)
  const allCompleted = state.players.every(p => {
    const f10 = p.frames[9]?.rolls || [];
    if (f10.length === 0) return false;
    const r1 = f10[0];
    const r2 = f10[1];
    if (r1 < 10 && r1 + (r2 || 0) < 10) return f10.length >= 2;
    return f10.length === 3;
  });

  if (allCompleted && currentRules.gameover_dining) {
    triggerAction('gameover_dining');
  }
}

function advanceTurn(pins) {
  const { playerIndex, frameIndex, shotIndex } = state.currentInput;
  const player = state.players[playerIndex];
  const totalPlayers = state.players.length;

  if (frameIndex < 9) { // Frames 1 to 9
    if (pins === 10 || shotIndex === 1) { // Frame is finished for this player
      if (playerIndex + 1 < totalPlayers) {
        state.currentInput.playerIndex += 1;
        state.currentInput.shotIndex = 0;
      } else {
        state.currentInput.playerIndex = 0;
        state.currentInput.frameIndex += 1;
        state.currentInput.shotIndex = 0;
      }
    } else {
      state.currentInput.shotIndex = 1;
    }
  } else { // 10th Frame
    const f10 = player.frames[9].rolls;
    const r1 = f10[0];
    const r2 = f10[1];
    const allows3 = (r1 === 10 || r1 + (r2 || 0) === 10);
    const isPlayer10thFinished = (!allows3 && f10.length >= 2) || (allows3 && f10.length >= 3);

    if (isPlayer10thFinished) {
      if (playerIndex + 1 < totalPlayers) {
        state.currentInput.playerIndex += 1;
        state.currentInput.shotIndex = 0;
      }
    } else {
      state.currentInput.shotIndex = f10.length;
    }
  }
}

function findNextInputPosition() {
  for (let f = 0; f < 10; f++) {
    for (let p = 0; p < state.players.length; p++) {
      const player = state.players[p];
      const frame = player.frames[f] || { rolls: [] };
      if (f < 9) {
        if (frame.rolls.length === 0) {
          state.currentInput = { playerIndex: p, frameIndex: f, shotIndex: 0 };
          return;
        } else if (frame.rolls.length === 1 && frame.rolls[0] < 10) {
          state.currentInput = { playerIndex: p, frameIndex: f, shotIndex: 1 };
          return;
        }
      } else {
        const r1 = frame.rolls[0];
        const r2 = frame.rolls[1];
        const allows3 = (r1 === 10 || (r1 !== undefined && r2 !== undefined && r1 + r2 === 10));
        if (frame.rolls.length === 0) {
          state.currentInput = { playerIndex: p, frameIndex: 9, shotIndex: 0 };
          return;
        } else if (frame.rolls.length === 1) {
          state.currentInput = { playerIndex: p, frameIndex: 9, shotIndex: 1 };
          return;
        } else if (frame.rolls.length === 2 && allows3) {
          state.currentInput = { playerIndex: p, frameIndex: 9, shotIndex: 2 };
          return;
        }
      }
    }
  }
  // If all completed, park at last player frame 10
  state.currentInput = { playerIndex: state.players.length - 1, frameIndex: 9, shotIndex: 0 };
}

function findNextInputPositionForPlayer(pIdx) {
  const player = state.players[pIdx];
  for (let f = 0; f < 10; f++) {
    const frame = player.frames[f] || { rolls: [] };
    if (f < 9) {
      if (frame.rolls.length === 0) {
        state.currentInput.frameIndex = f;
        state.currentInput.shotIndex = 0;
        return;
      } else if (frame.rolls.length === 1 && frame.rolls[0] < 10) {
        state.currentInput.frameIndex = f;
        state.currentInput.shotIndex = 1;
        return;
      }
    } else {
      const r1 = frame.rolls[0];
      const r2 = frame.rolls[1];
      const allows3 = (r1 === 10 || (r1 !== undefined && r2 !== undefined && r1 + r2 === 10));
      if (frame.rolls.length < 2 || (allows3 && frame.rolls.length < 3)) {
        state.currentInput.frameIndex = 9;
        state.currentInput.shotIndex = frame.rolls.length;
        return;
      }
    }
  }
  state.currentInput.frameIndex = 9;
  state.currentInput.shotIndex = 0;
}

function undoLastRoll() {
  const { playerIndex, frameIndex } = state.currentInput;
  const player = state.players[playerIndex];
  const frame = player?.frames[frameIndex];

  if (frame && frame.rolls.length > 0) {
    frame.rolls.pop();
    state.currentInput.shotIndex = frame.rolls.length;
  } else {
    // Look for previous roll
    if (playerIndex > 0) {
      state.currentInput.playerIndex -= 1;
    } else if (frameIndex > 0) {
      state.currentInput.frameIndex -= 1;
      state.currentInput.playerIndex = state.players.length - 1;
    }
    const prevPlayer = state.players[state.currentInput.playerIndex];
    const prevFrame = prevPlayer?.frames[state.currentInput.frameIndex];
    if (prevFrame && prevFrame.rolls.length > 0) {
      prevFrame.rolls.pop();
      state.currentInput.shotIndex = prevFrame.rolls.length;
    }
  }

  renderScoreboard();
  renderPinKeypad();
  showToast('↩ 1投前のスコアを取り消しました', 'toast-success');
}

function clearGameScores() {
  state.players.forEach(p => {
    p.frames = Array.from({ length: 10 }, () => ({ rolls: [] }));
  });
  state.currentInput = { playerIndex: 0, frameIndex: 0, shotIndex: 0 };
  state.activeCoupon = null;
  state.activeAction = 'default';

  renderScoreboard();
  renderPinKeypad();
  renderPushCoupon();
  renderOverheadMonitor('NEW GAME', '新ゲームを開始します。1投目をどうぞ！', '🎳');
  renderRationale('default');
  showToast('🗑️ スコアボードをクリアしました。1投目を入力してください', 'toast-success');
}

// --- Menu Rendering ---

function renderMenu() {
  const menuGrid = document.getElementById('menu-grid');
  menuGrid.innerHTML = '';

  const presetKey = state.preset in MENUS ? state.preset : 'senior_lunch';
  const categoryItems = MENUS[presetKey][state.activeTab] || MENUS[presetKey].recommended;

  categoryItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-card';

    let tagHtml = '';
    if (item.tag) {
      const isHot = item.tag.includes('人気') || item.tag.includes('No.1');
      const isShare = item.tag.includes('シェア') || item.tag.includes('グループ');
      tagHtml = `<span class="menu-item-tag ${isHot ? 'tag-hot' : isShare ? 'tag-share' : ''}">${item.tag}</span>`;
    }

    card.innerHTML = `
      <div class="menu-card-top">
        ${tagHtml || '<span></span>'}
        <span class="menu-item-icon">${item.icon}</span>
      </div>
      <div class="menu-item-name">${item.name}</div>
      <div class="menu-item-desc">${item.desc}</div>
      <div class="menu-card-bottom">
        <span class="menu-item-price">¥${item.price.toLocaleString()}</span>
        <button class="btn-add-item" onclick="addToCart('${item.id}', '${item.name}', ${item.price})">+ 追加</button>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}

// --- Push Coupon Banner Rendering ---

function renderPushCoupon() {
  const container = document.getElementById('coupon-push-banner');
  if (!state.activeCoupon) {
    if (state.playerCount >= 3) {
      container.innerHTML = `
        <div class="push-coupon-card type-special">
          <div class="coupon-left">
            <span class="coupon-badge-icon">👥</span>
            <div class="coupon-texts">
              <h4>【${state.playerCount}名様グループ限定】シェアポテト2倍増量 特典</h4>
              <p>グループでのプレイを検知しました。フード1品以上のご注文でポテト2倍サービス！</p>
            </div>
          </div>
          <button class="btn-apply-coupon" onclick="applyPushCoupon('group_share')">1タップで適用</button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="push-coupon-card type-dining">
          <div class="coupon-left">
            <span class="coupon-badge-icon">🍝</span>
            <div class="coupon-texts">
              <h4>本格イタリアン Bolo レーン直送オーダー</h4>
              <p>ボウリングをしながら熱々の出来立てピザや生パスタ、珈琲をお楽しみいただけます。</p>
            </div>
          </div>
        </div>
      `;
    }
    return;
  }

  const c = state.activeCoupon;
  const isNonImmediate = c.typeClass === 'type-dining' || c.isNonImmediate === true || Boolean(c.voucherCode);

  if (isNonImmediate) {
    const code = c.voucherCode || '7842';
    const qrUrl = `https://artie-info.com/bolo?coupon=${code}`;
    container.innerHTML = `
      <div class="push-coupon-card ${c.typeClass}">
        <div class="coupon-left">
          <span class="coupon-badge-icon">${c.icon}</span>
          <div class="coupon-texts">
            <h4>${c.title}</h4>
            <p>${c.desc}</p>
            ${c.note ? `<p class="coupon-note">※ ${c.note}</p>` : ''}
          </div>
        </div>
        <div class="coupon-qr-side-box">
          <div class="tablet-qr-canvas" id="tablet-qr-canvas"></div>
          <div class="tablet-qr-code-text">#${code}</div>
          <div class="tablet-qr-sub">Boloレジ提示用</div>
        </div>
      </div>
    `;
    setTimeout(() => {
      generateQRCode('tablet-qr-canvas', qrUrl, 72);
    }, 20);
  } else {
    container.innerHTML = `
      <div class="push-coupon-card ${c.typeClass}">
        <div class="coupon-left">
          <span class="coupon-badge-icon">${c.icon}</span>
          <div class="coupon-texts">
            <h4>${c.title}</h4>
            <p>${c.desc}</p>
            ${c.note ? `<p class="coupon-note">※ ${c.note}</p>` : ''}
          </div>
        </div>
        <button class="btn-apply-coupon" onclick="applyPushCoupon('${c.id}')">${c.actionText || '1タップで適用'}</button>
      </div>
    `;
  }
}

// --- Trigger Simulation Logic ---

function triggerAction(actionKey) {
  const currentRules = SEGMENT_EVENT_RULES[state.preset] || {};
  const rule = currentRules[actionKey];

  if (!rule) {
    showToast(`⚠️ この客層（${PRESETS[state.preset]?.timeSlotName}）にはこのイベントは設定されていません`, 'toast-coupon');
    return;
  }

  state.activeAction = actionKey;

  // Apply score simulation shortcuts if triggered via button
  const p0 = state.players[0];
  switch (actionKey) {
    case 'strike':
      if (p0 && p0.frames[9]) {
        p0.frames[9].rolls = [10, 10];
      }
      break;

    case 'turkey':
      if (p0) {
        p0.frames[7] = { rolls: [10] };
        p0.frames[8] = { rolls: [10] };
        p0.frames[9] = { rolls: [10, 10, 10] };
      }
      break;

    case 'gutter':
      const targetP = state.players[2] || state.players[0];
      if (targetP && targetP.frames[9]) {
        targetP.frames[9].rolls = [0, 0];
      }
      break;

    case 'date_easteregg':
      if (p0) {
        p0.frames[9] = { rolls: [9, 0] };
      }
      break;

    case 'zoro_easteregg':
      if (p0) {
        p0.frames[9] = { rolls: [1, 0] };
      }
      break;

    case 'just_easteregg':
      if (p0) {
        p0.frames[9] = { rolls: [0, 0] };
      }
      break;

    case 'birthday_easteregg':
      break;

    case 'gameover_dining':
      document.getElementById('monitor-voucher-area').style.display = 'flex';
      break;
  }

  state.activeCoupon = {
    id: `${state.preset}_${actionKey}`,
    ...rule
  };

  renderScoreboard();
  renderPinKeypad();
  renderOverheadMonitor(
    rule.overhead?.title || 'SPECIAL EVENT',
    rule.overhead?.sub || 'おめでとうございます！',
    rule.overhead?.icon || rule.icon || '🎳',
    rule.voucherCode || '7842'
  );
  renderPushCoupon();
  renderRationale(rule.rationaleKey || actionKey);
  showToast(rule.toast || 'イベントが発火しました！', 'toast-coupon');
}

function resetSimulation() {
  applyPreset(state.preset);
  showToast('🔄 シミュレーションをリセットしました', 'toast-success');
}

// --- Overhead Monitor Rendering ---

function renderOverheadMonitor(title, sub, icon, voucherCode = '7842') {
  const screen = document.getElementById('overhead-screen');
  const animIcon = screen.querySelector('.monitor-anim-icon');
  const bannerTitle = screen.querySelector('.monitor-banner-title');
  const bannerSub = screen.querySelector('.monitor-banner-sub');
  const voucherArea = document.getElementById('monitor-voucher-area');

  animIcon.innerText = icon;
  bannerTitle.innerText = title;
  bannerSub.innerText = sub;

  if (voucherArea) {
    voucherArea.innerHTML = `
      <div class="monitor-footer-left">
        <div class="voucher-mini-badge">Bolo Dining Voucher</div>
        <div class="voucher-mini-sub">ゲーム後のお食事・カフェ優待</div>
      </div>
      <div class="monitor-qr-group">
        <div class="monitor-qr-canvas" id="monitor-qr-canvas"></div>
        <div class="voucher-mini-code">#${voucherCode}</div>
      </div>
    `;
    setTimeout(() => {
      generateQRCode('monitor-qr-canvas', `https://artie-info.com/bolo?coupon=${voucherCode}`, 44);
    }, 20);
  }

  // Flash animation
  screen.style.borderColor = '#38bdf8';
  screen.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.4)';
  setTimeout(() => {
    screen.style.borderColor = '#1f2937';
    screen.style.boxShadow = 'none';
  }, 1000);
}

// --- Strategy Rationale Rendering ---

function renderRationale(actionKey) {
  const container = document.getElementById('rationale-content');
  const r = RATIONALE_TEMPLATES[actionKey] || RATIONALE_TEMPLATES.default;

  container.innerHTML = `
    <div class="rationale-section-box">
      <div class="box-title">🎯 現在のコンテキスト & 発動トリガー</div>
      <div class="box-content-text">
        <strong>客層:</strong> <span class="highlight-badge">${PRESETS[state.preset].timeSlotName} (${state.playerCount}名)</span>
        <br><strong>トリガー条件:</strong> ${r.trigger}
        <br><strong>発券形式:</strong> ${r.type}
      </div>
    </div>

    <div class="rationale-section-box">
      <div class="box-title">💡 施策の戦略的意図（なぜこの特典か？）</div>
      <div class="box-content-text">${r.intent}</div>
    </div>

    <div class="rationale-section-box">
      <div class="box-title">🔒 不正利用・コード漏洩防止の仕組み</div>
      <div class="box-content-text">${r.antiFraud}</div>
    </div>

    <div class="rationale-section-box">
      <div class="box-title">✨ 不満防止のUX設計（別日に出なかった時の対策）</div>
      <div class="box-content-text">${r.uxSafeguard}</div>
    </div>
  `;

  // Update KPI Box
  document.getElementById('kpi-arpu').innerText = r.arpuImpact.split('（')[0];
  document.getElementById('kpi-cs').innerText = r.csImpact.split('（')[0];
}

// --- Cart & Order Handling ---

function addToCart(itemId, name, price) {
  state.cart.push({ id: itemId, name, price });
  updateCartUI();
  showToast(`🛒 ${name} をカートに追加しました`, 'toast-success');
}

function applyPushCoupon(couponId) {
  if (couponId === 'group_share') {
    addToCart('sp_share', '【グループ特典】山盛りポテト2倍増量', 0);
  } else if (state.activeCoupon) {
    addToCart('c_applied', `【クーポン適用】${state.activeCoupon.title.split('！')[0]}`, 0);
  }
}

function updateCartUI() {
  const countSpan = document.getElementById('cart-count');
  const totalSpan = document.getElementById('cart-total');

  const totalAmount = state.cart.reduce((sum, item) => sum + item.price, 0);
  countSpan.innerText = `注文合計: ${state.cart.length}品`;
  totalSpan.innerText = `¥${totalAmount.toLocaleString()}`;
}

function submitOrder() {
  if (state.cart.length === 0) {
    showToast('⚠️ カートに商品が入っていません。商品を選択してください。', 'toast-coupon');
    return;
  }
  const totalAmount = state.cart.reduce((sum, item) => sum + item.price, 0);
  showToast(`✅ Lane 5 より ${state.cart.length}品 (¥${totalAmount.toLocaleString()}) の注文を受け付けました！配膳をお待ちください。`, 'toast-success');
  state.cart = [];
  updateCartUI();
}

function showToast(message, type = 'toast-success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerText = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Run on page load
window.addEventListener('DOMContentLoaded', init);

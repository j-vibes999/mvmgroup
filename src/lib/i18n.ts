// Locale configuration and interface strings.
// URL prefixes follow the brief (/en/, /la/, /zh/). The HTML lang / hreflang
// values use the correct codes (lo = Lao, zh-Hans = Simplified Chinese).

export const LOCALES: { code: Lang; htmlLang: string; hreflang: string; ogLocale: string; label: string; short: string }[] = [
  { code: 'en', htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US', label: 'English', short: 'EN' },
  { code: 'la', htmlLang: 'lo', hreflang: 'lo', ogLocale: 'lo_LA', label: 'ລາວ', short: 'ລາວ' },
  { code: 'zh', htmlLang: 'zh-Hans', hreflang: 'zh-Hans', ogLocale: 'zh_CN', label: '中文', short: '中文' },
];
export type Lang = 'en' | 'la' | 'zh';
export const DEFAULT_LOCALE: Lang = 'en';
export const localeInfo = (code: string) => LOCALES.find((l) => l.code === code) || LOCALES[0];

// Build a localized URL: url('en', 'services', 'x') -> /en/services/x/
export function url(lang: Lang, ...segments: (string | number | undefined | null)[]): string {
  const parts = segments.filter((s) => s !== undefined && s !== null && s !== '');
  return `/${lang}/${parts.length ? parts.join('/') + '/' : ''}`;
}

const STRINGS: Record<string, Record<string, string>> = {
  // Navigation
  'nav.home': { en: 'Home', la: 'ໜ້າຫຼັກ', zh: '首页' },
  'nav.about': { en: 'About', la: 'ກ່ຽວກັບພວກເຮົາ', zh: '关于我们' },
  'nav.services': { en: 'Services', la: 'ບໍລິການ', zh: '业务服务' },
  'nav.brands': { en: 'Brands', la: 'ແບຣນ', zh: '旗下品牌' },
  'nav.projects': { en: 'Our work', la: 'ຜົນງານ', zh: '成果案例' },
  'nav.news': { en: 'News', la: 'ຂ່າວສານ', zh: '新闻资讯' },
  'nav.contact': { en: 'Contact', la: 'ຕິດຕໍ່', zh: '联系我们' },
  'nav.contactUs': { en: 'Contact us', la: 'ຕິດຕໍ່ພວກເຮົາ', zh: '联系我们' },
  'nav.menu': { en: 'Menu', la: 'ເມນູ', zh: '菜单' },
  'nav.close': { en: 'Close', la: 'ປິດ', zh: '关闭' },
  'nav.language': { en: 'Language', la: 'ພາສາ', zh: '语言' },
  'nav.skip': { en: 'Skip to content', la: 'ຂ້າມໄປຫາເນື້ອຫາ', zh: '跳至正文' },
  'nav.aboutGroup': { en: 'About MVM Group', la: 'ກ່ຽວກັບ MVM Group', zh: '关于 MVM 集团' },
  'nav.businessUnits': { en: 'Business units', la: 'ໜ່ວຍທຸລະກິດ', zh: '业务板块' },
  'nav.partnership': { en: 'Distributors & partners', la: 'ຕົວແທນ ແລະ ຄູ່ຮ່ວມທຸລະກິດ', zh: '经销与合作' },
  'nav.allServices': { en: 'All services', la: 'ບໍລິການທັງໝົດ', zh: '全部服务' },
  'nav.allBrands': { en: 'All brands', la: 'ແບຣນທັງໝົດ', zh: '全部品牌' },
  'nav.breadcrumb': { en: 'Breadcrumb', la: 'ເສັ້ນທາງໜ້າ', zh: '页面路径' },

  // Common actions
  'cta.learnMore': { en: 'Learn more', la: 'ເບິ່ງລາຍລະອຽດ', zh: '了解更多' },
  'cta.viewAll': { en: 'View all', la: 'ເບິ່ງທັງໝົດ', zh: '查看全部' },
  'cta.viewServices': { en: 'Explore our services', la: 'ເບິ່ງບໍລິການຂອງພວກເຮົາ', zh: '查看我们的服务' },
  'cta.viewBrands': { en: 'Discover our brands', la: 'ເບິ່ງແບຣນຂອງພວກເຮົາ', zh: '了解我们的品牌' },
  'cta.viewBrand': { en: 'View brand', la: 'ເບິ່ງແບຣນ', zh: '查看品牌' },
  'cta.viewProjects': { en: 'View all our work', la: 'ເບິ່ງຜົນງານທັງໝົດ', zh: '查看全部成果' },
  'cta.viewNews': { en: 'All news and articles', la: 'ຂ່າວ ແລະ ບົດຄວາມທັງໝົດ', zh: '全部新闻与文章' },
  'cta.readArticle': { en: 'Read article', la: 'ອ່ານບົດຄວາມ', zh: '阅读全文' },
  'cta.requestQuote': { en: 'Request a quote', la: 'ຂໍໃບສະເໜີລາຄາ', zh: '获取报价' },
  'cta.contactUs': { en: 'Contact us', la: 'ຕິດຕໍ່ພວກເຮົາ', zh: '联系我们' },
  'cta.becomeDistributor': { en: 'Become a distributor', la: 'ສະໝັກເປັນຕົວແທນຈຳໜ່າຍ', zh: '申请成为经销商' },
  'cta.contactBrand': { en: 'Contact the brand team', la: 'ຕິດຕໍ່ທີມງານແບຣນ', zh: '联系品牌团队' },
  'cta.backHome': { en: 'Back to home', la: 'ກັບໄປໜ້າຫຼັກ', zh: '返回首页' },
  'cta.aboutGroup': { en: 'About MVM Group', la: 'ກ່ຽວກັບ MVM Group', zh: '关于 MVM 集团' },
  'cta.partner': { en: 'Partner with us', la: 'ຮ່ວມເປັນຄູ່ທຸລະກິດກັບພວກເຮົາ', zh: '与我们合作' },
  'cta.chat': { en: 'Chat with us', la: 'ລົມກັບພວກເຮົາ', zh: '在线咨询' },
  'cta.callUs': { en: 'Call us', la: 'ໂທຫາພວກເຮົາ', zh: '致电我们' },

  // Home
  'home.rooms': { en: 'Choose a section', la: 'ເລືອກຫົວຂໍ້', zh: '选择栏目' },
  'home.groupTitle': { en: 'The businesses of MVM GROUP', la: 'ທຸລະກິດໃນເຄືອ MVM GROUP', zh: 'MVM 集团旗下业务' },
  'home.kindService': { en: 'Service', la: 'ບໍລິການ', zh: '服务' },
  'home.kindBrand': { en: 'Brand', la: 'ແບຣນ', zh: '品牌' },
  'home.enter': { en: 'Enter', la: 'ເຂົ້າເບິ່ງ', zh: '进入' },
  'home.ctaTitle': { en: "Let's talk about what you need", la: 'ບອກພວກເຮົາວ່າທ່ານຕ້ອງການຫຍັງ', zh: '告诉我们您的需求' },
  'home.ctaText': {
    en: 'Documents, a trip, or our products: tell us what you need and our team will reply with the next steps and a quotation.',
    la: 'ເອກະສານ, ການເດີນທາງ ຫຼື ສິນຄ້າຂອງພວກເຮົາ: ບອກຄວາມຕ້ອງການຂອງທ່ານ ແລ້ວທີມງານຈະຕອບກັບ ພ້ອມຂັ້ນຕອນຕໍ່ໄປ ແລະ ໃບສະເໜີລາຄາ.',
    zh: '无论是办理文件、安排行程，还是采购我们的产品，请告诉我们您的需求，团队将回复后续步骤和报价。',
  },

  // Section titles
  'section.services': { en: 'Our services', la: 'ບໍລິການຂອງພວກເຮົາ', zh: '我们的服务' },
  'section.brands': { en: 'Our brands', la: 'ແບຣນຂອງພວກເຮົາ', zh: '旗下品牌' },
  'section.why': { en: 'Why choose MVM Group', la: 'ເປັນຫຍັງຕ້ອງເລືອກ MVM Group', zh: '为什么选择 MVM 集团' },
  'section.projects': { en: 'Our work', la: 'ຜົນງານ', zh: '成果案例' },
  'section.news': { en: 'Latest news', la: 'ຂ່າວລ່າສຸດ', zh: '最新资讯' },

  // Tours
  'tour.packages': { en: 'Tour packages', la: 'ແພັກເກດທົວ', zh: '旅游套餐' },
  'tour.seePackages': { en: 'See tour packages', la: 'ເບິ່ງແພັກເກດທົວ', zh: '查看旅游套餐' },
  'tour.viewItinerary': { en: 'View itinerary', la: 'ເບິ່ງໂປຣແກຣມທົວ', zh: '查看行程' },
  'tour.destinations': { en: 'Where to go', la: 'ສະຖານທີ່ທ່ອງທ່ຽວ', zh: '热门目的地' },
  'tour.info': { en: 'Travel information', la: 'ຂໍ້ມູນການທ່ອງທ່ຽວ', zh: '旅游须知' },
  'tour.more': { en: 'More travel services', la: 'ບໍລິການເດີນທາງອື່ນໆ', zh: '更多出行服务' },
  'tour.how': { en: 'How booking works', la: 'ຂັ້ນຕອນການຈອງ', zh: '预订流程' },
  'tour.duration': { en: 'Duration', la: 'ໄລຍະເວລາ', zh: '行程天数' },
  'tour.route': { en: 'Route', la: 'ເສັ້ນທາງ', zh: '路线' },
  'tour.start': { en: 'Starts', la: 'ເລີ່ມຕົ້ນ', zh: '出发地' },
  'tour.end': { en: 'Ends', la: 'ສິ້ນສຸດ', zh: '结束地' },
  'tour.transport': { en: 'Transport', la: 'ການເດີນທາງ', zh: '交通' },
  'tour.bestFor': { en: 'Best for', la: 'ເໝາະສຳລັບ', zh: '适合人群' },
  'tour.overview': { en: 'About this tour', la: 'ກ່ຽວກັບທົວນີ້', zh: '行程介绍' },
  'tour.highlights': { en: 'Highlights', la: 'ຈຸດເດັ່ນ', zh: '行程亮点' },
  'tour.itinerary': { en: 'Day-by-day itinerary', la: 'ໂປຣແກຣມລາຍວັນ', zh: '每日行程' },
  'tour.day': { en: 'Day {n}', la: 'ມື້ທີ {n}', zh: '第{n}天' },
  'tour.days': { en: 'days', la: 'ມື້', zh: '天' },
  'tour.visit': { en: 'Where we go', la: 'ທ່ຽວບ່ອນໃດ', zh: '游览' },
  'tour.overnight': { en: 'Overnight', la: 'ພັກແຮມ', zh: '住宿' },
  'tour.includes': { en: 'Included', la: 'ລວມໃນລາຄາ', zh: '费用包含' },
  'tour.excludes': { en: 'Not included', la: 'ບໍ່ລວມໃນລາຄາ', zh: '费用不含' },
  'tour.note': {
    en: 'These are sample itineraries. Every tour can be private or for a group, changed to fit your dates and interests, and run with a guide in Lao, English, Chinese or Thai. Hotels, inclusions and the price are confirmed in your quotation.',
    la: 'ນີ້ແມ່ນໂປຣແກຣມຕົວຢ່າງ. ທຸກທົວຈັດເປັນທົວສ່ວນຕົວ ຫຼື ທົວກຸ່ມໄດ້, ປັບໃຫ້ເຂົ້າກັບວັນທີ ແລະ ຄວາມສົນໃຈຂອງທ່ານ ແລະ ມີໄກດ໌ພາສາລາວ, ອັງກິດ, ຈີນ ຫຼື ໄທ. ໂຮງແຮມ, ສິ່ງທີ່ລວມ ແລະ ລາຄາ ຈະຢືນຢັນໃນໃບສະເໜີລາຄາ.',
    zh: '以上为参考行程。所有线路均可安排私家团或拼团，可根据您的日期和兴趣调整，并配备老挝语、英语、中文或泰语导游。酒店、费用包含项目及价格以报价单为准。',
  },
  'tour.request': { en: 'Request this tour', la: 'ຈອງທົວນີ້', zh: '预订此行程' },
  'tour.requestText': {
    en: 'Tell us your dates and the number of travellers. We reply with a confirmed itinerary, hotels and price.',
    la: 'ບອກວັນທີ ແລະ ຈຳນວນຜູ້ເດີນທາງ. ພວກເຮົາຈະຕອບກັບພ້ອມໂປຣແກຣມ, ໂຮງແຮມ ແລະ ລາຄາ.',
    zh: '告诉我们您的出行日期和人数，我们将回复确认的行程、酒店和价格。',
  },
  'tour.other': { en: 'Other tour packages', la: 'ແພັກເກດທົວອື່ນໆ', zh: '其他旅游套餐' },
  'tour.all': { en: 'All tour packages', la: 'ແພັກເກດທົວທັງໝົດ', zh: '全部旅游套餐' },
  'tour.sights': { en: 'Top sights', la: 'ຈຸດທ່ອງທ່ຽວເດັ່ນ', zh: '主要景点' },
  'tour.stay': { en: 'Where to stay', la: 'ພັກທີ່ໃດ', zh: '住宿' },
  'tour.gettingThere': { en: 'Getting there', la: 'ເດີນທາງໄປແນວໃດ', zh: '如何到达' },
  'tour.time': { en: 'Time needed', la: 'ໃຊ້ເວລາ', zh: '建议停留' },
  'tour.ctaTitle': { en: 'Plan your trip to Laos with us', la: 'ວາງແຜນທ່ຽວລາວກັບພວກເຮົາ', zh: '与我们一起规划老挝之旅' },
  'tour.ctaText': {
    en: 'Send us your dates, the number of travellers and what you would like to see. We reply with an itinerary and a quotation.',
    la: 'ສົ່ງວັນທີ, ຈຳນວນຜູ້ເດີນທາງ ແລະ ສິ່ງທີ່ທ່ານຢາກທ່ຽວ. ພວກເຮົາຈະຕອບກັບພ້ອມໂປຣແກຣມ ແລະ ໃບສະເໜີລາຄາ.',
    zh: '告诉我们您的日期、人数和想去的地方，我们将回复行程和报价。',
  },

  // Service detail
  'service.whatIs': { en: 'What this service is', la: 'ບໍລິການນີ້ແມ່ນຫຍັງ', zh: '服务介绍' },
  'service.whoFor': { en: 'Who it is for', la: 'ເໝາະສຳລັບໃຜ', zh: '适合对象' },
  'service.help': { en: 'How we help', la: 'ພວກເຮົາຊ່ວຍຫຍັງໄດ້ແດ່', zh: '我们能提供的帮助' },
  'service.process': { en: 'How it works', la: 'ຂັ້ນຕອນການໃຊ້ບໍລິການ', zh: '服务流程' },
  'service.documents': { en: 'Documents you will need', la: 'ເອກະສານທີ່ຕ້ອງໃຊ້', zh: '所需文件' },
  'service.timeline': { en: 'Processing time', la: 'ໄລຍະເວລາດຳເນີນການ', zh: '办理时间' },
  'service.faq': { en: 'Frequently asked questions', la: 'ຄຳຖາມທີ່ພົບເລື້ອຍ', zh: '常见问题' },
  'service.pricing': { en: 'Pricing', la: 'ລາຄາ', zh: '价格' },
  'service.pricingNote': { en: 'Contact us for quotation', la: 'ກະລຸນາຕິດຕໍ່ເພື່ອຂໍໃບສະເໜີລາຄາ', zh: '请联系我们获取报价' },
  'service.pricingText': {
    en: 'Every case is different. Send us your details and we will prepare a quotation for your situation.',
    la: 'ແຕ່ລະກໍລະນີມີຄວາມແຕກຕ່າງກັນ. ສົ່ງລາຍລະອຽດມາໃຫ້ພວກເຮົາ ແລ້ວພວກເຮົາຈະກະກຽມໃບສະເໜີລາຄາຕາມສະພາບຕົວຈິງຂອງທ່ານ.',
    zh: '每个项目的情况都不同。请发送您的详细信息，我们将根据您的实际情况准备报价。',
  },
  'service.onThisPage': { en: 'On this page', la: 'ໃນໜ້ານີ້', zh: '本页内容' },
  'service.other': { en: 'Other services', la: 'ບໍລິການອື່ນໆ', zh: '其他服务' },
  'service.timelineNote': {
    en: 'Times are estimates. Government processing times vary, and we confirm a timeline after reviewing your case.',
    la: 'ໄລຍະເວລາເປັນພຽງການປະເມີນ. ເວລາດຳເນີນການຂອງພາກລັດອາດແຕກຕ່າງກັນ, ພວກເຮົາຈະຢືນຢັນໄລຍະເວລາຫຼັງຈາກກວດສອບກໍລະນີຂອງທ່ານ.',
    zh: '以上时间仅供参考。政府部门办理时间可能有所不同，我们会在审核您的情况后确认具体时间。',
  },
  'service.documentsNote': {
    en: 'The exact list depends on your case. We send you a checklist before we start.',
    la: 'ລາຍການທີ່ແນ່ນອນຂຶ້ນກັບກໍລະນີຂອງທ່ານ. ພວກເຮົາຈະສົ່ງລາຍການກວດສອບໃຫ້ກ່ອນເລີ່ມວຽກ.',
    zh: '具体清单视您的情况而定。开始前我们会向您发送文件清单。',
  },
  'service.step': { en: 'Step', la: 'ຂັ້ນຕອນ', zh: '步骤' },
  'service.unit': { en: 'Business unit', la: 'ໜ່ວຍທຸລະກິດ', zh: '所属板块' },

  // Brands
  'brand.story': { en: 'Brand story', la: 'ເລື່ອງລາວຂອງແບຣນ', zh: '品牌故事' },
  'brand.concept': { en: 'Concept', la: 'ແນວຄິດ', zh: '品牌理念' },
  'brand.highlights': { en: 'What makes it different', la: 'ຈຸດເດັ່ນ', zh: '产品亮点' },
  'brand.products': { en: 'Products', la: 'ລາຍການສິນຄ້າ', zh: '产品系列' },
  'brand.flavors': { en: 'Flavours', la: 'ລົດຊາດ', zh: '口味' },
  'brand.sizes': { en: 'Pack sizes', la: 'ຂະໜາດສິນຄ້າ', zh: '规格' },
  'brand.gallery': { en: 'Gallery', la: 'ຄັງຮູບ', zh: '图片展示' },
  'brand.usage': { en: 'How to use', la: 'ວິທີໃຊ້', zh: '食用方法' },
  'brand.whereToBuy': { en: 'Where to buy', la: 'ຈຸດຈຳໜ່າຍ', zh: '销售网点' },
  'brand.distributorTitle': { en: 'Become a distributor', la: 'ສະໝັກເປັນຕົວແທນຈຳໜ່າຍ', zh: '成为经销商' },
  'brand.distributorText': {
    en: 'We are building a network of distributors, wholesalers and retailers. Tell us about your business and the area you cover.',
    la: 'ພວກເຮົາກຳລັງສ້າງເຄືອຂ່າຍຕົວແທນຈຳໜ່າຍ, ຮ້ານຂາຍຍົກ ແລະ ຮ້ານຂາຍຍ່ອຍ. ບອກພວກເຮົາກ່ຽວກັບທຸລະກິດ ແລະ ພື້ນທີ່ທີ່ທ່ານດູແລ.',
    zh: '我们正在建立经销商、批发商和零售商网络。请告诉我们您的业务及覆盖区域。',
  },
  'brand.contactTitle': { en: 'Contact the brand', la: 'ຕິດຕໍ່ແບຣນ', zh: '联系品牌' },
  'brand.of': { en: 'A brand of MVM GROUP', la: 'ແບຣນໃນເຄືອ MVM GROUP', zh: 'MVM 集团旗下品牌' },
  'brand.moreTitle': { en: 'Room for the next brand', la: 'ພ້ອມສຳລັບແບຣນຕໍ່ໄປ', zh: '期待下一个品牌' },
  'brand.moreText': {
    en: 'MVM GROUP develops and distributes its own consumer brands. If you have a product or brand you want to bring to Laos, talk to us.',
    la: 'MVM GROUP ພັດທະນາ ແລະ ຈັດຈຳໜ່າຍແບຣນສິນຄ້າຂອງຕົນເອງ. ຖ້າທ່ານມີສິນຄ້າ ຫຼື ແບຣນທີ່ຢາກນຳເຂົ້າມາ ສປປ ລາວ, ລົມກັບພວກເຮົາໄດ້.',
    zh: 'MVM 集团开发并分销自有消费品牌。如果您有希望进入老挝市场的产品或品牌，欢迎与我们洽谈。',
  },
  'brand.noOutlets': {
    en: 'Retail locations will be listed here soon. Contact us to find the nearest seller.',
    la: 'ຈຸດຈຳໜ່າຍຈະຖືກເພີ່ມໃສ່ບ່ອນນີ້ໃນໄວໆນີ້. ຕິດຕໍ່ພວກເຮົາເພື່ອຊອກຫາຮ້ານທີ່ໃກ້ທີ່ສຸດ.',
    zh: '销售网点即将公布。请联系我们查询离您最近的销售点。',
  },

  // Projects
  'project.client': { en: 'Client', la: 'ລູກຄ້າ', zh: '客户' },
  'project.category': { en: 'Type of work', la: 'ປະເພດວຽກ', zh: '项目类型' },
  'project.year': { en: 'Year', la: 'ປີ', zh: '年份' },
  'project.location': { en: 'Location', la: 'ສະຖານທີ່', zh: '地点' },
  'project.services': { en: 'Services used', la: 'ບໍລິການທີ່ໃຊ້', zh: '涉及服务' },
  'project.gallery': { en: 'Project gallery', la: 'ຮູບພາບໂຄງການ', zh: '项目图片' },
  'project.sample': { en: 'Sample entry', la: 'ຕົວຢ່າງ', zh: '示例' },
  'project.related': { en: 'More of our work', la: 'ຜົນງານອື່ນໆ', zh: '更多成果' },
  'project.empty': {
    en: 'No projects in this category yet.',
    la: 'ຍັງບໍ່ມີຜົນງານໃນໝວດນີ້.',
    zh: '该类别暂无案例。',
  },

  // News
  'news.all': { en: 'All', la: 'ທັງໝົດ', zh: '全部' },
  'news.categories': { en: 'Categories', la: 'ໝວດໝູ່', zh: '分类' },
  'news.related': { en: 'Related articles', la: 'ບົດຄວາມທີ່ກ່ຽວຂ້ອງ', zh: '相关文章' },
  'news.empty': { en: 'No articles yet.', la: 'ຍັງບໍ່ມີບົດຄວາມ.', zh: '暂无文章。' },
  'news.share': { en: 'Share', la: 'ແບ່ງປັນ', zh: '分享' },
  'news.copyLink': { en: 'Copy link', la: 'ສຳເນົາລິ້ງ', zh: '复制链接' },
  'news.copied': { en: 'Link copied', la: 'ສຳເນົາລິ້ງແລ້ວ', zh: '链接已复制' },
  'news.page': { en: 'Page', la: 'ໜ້າ', zh: '第' },
  'news.prev': { en: 'Newer', la: 'ໃໝ່ກວ່າ', zh: '较新' },
  'news.next': { en: 'Older', la: 'ເກົ່າກວ່າ', zh: '较早' },

  // About
  'about.history': { en: 'Our story', la: 'ປະຫວັດຂອງພວກເຮົາ', zh: '集团历程' },
  'about.vision': { en: 'Vision', la: 'ວິໄສທັດ', zh: '愿景' },
  'about.mission': { en: 'Mission', la: 'ພາລະກິດ', zh: '使命' },
  'about.goals': { en: 'Goals', la: 'ເປົ້າໝາຍ', zh: '发展目标' },
  'about.strengths': { en: 'Strengths', la: 'ຈຸດແຂງ', zh: '核心优势' },
  'about.team': { en: 'Leadership team', la: 'ທີມບໍລິຫານ', zh: '管理团队' },
  'about.areas': { en: 'Where we operate', la: 'ພື້ນທີ່ດຳເນີນທຸລະກິດ', zh: '业务区域' },
  'about.cooperation': { en: 'Laos, China and beyond', la: 'ລາວ, ຈີນ ແລະ ສາກົນ', zh: '老挝、中国与国际' },
  'about.registration': { en: 'Company registration', la: 'ການຈົດທະບຽນບໍລິສັດ', zh: '公司注册信息' },
  'about.legalName': { en: 'Registered company name', la: 'ຊື່ບໍລິສັດທີ່ຈົດທະບຽນ', zh: '注册公司名称' },
  'about.taxId': { en: 'Tax ID (TIN)', la: 'ເລກປະຈຳຕົວຜູ້ເສຍອາກອນ', zh: '税号' },
  'about.registeredAddress': { en: 'Registered address', la: 'ທີ່ຢູ່ທີ່ຈົດທະບຽນ', zh: '注册地址' },
  'about.milestones': { en: 'Milestones', la: 'ເຫດການສຳຄັນ', zh: '发展里程碑' },

  // Contact
  'contact.phone': { en: 'Phone', la: 'ເບີໂທ', zh: '电话' },
  'contact.whatsapp': { en: 'WhatsApp', la: 'WhatsApp', zh: 'WhatsApp' },
  'contact.wechat': { en: 'WeChat', la: 'WeChat', zh: '微信' },
  'contact.email': { en: 'Email', la: 'ອີເມວ', zh: '电子邮箱' },
  'contact.address': { en: 'Address', la: 'ທີ່ຢູ່', zh: '地址' },
  'contact.hours': { en: 'Office hours', la: 'ເວລາເຮັດວຽກ', zh: '办公时间' },
  'contact.facebook': { en: 'Facebook', la: 'Facebook', zh: 'Facebook' },
  'contact.tiktok': { en: 'TikTok', la: 'TikTok', zh: 'TikTok' },
  'contact.map': { en: 'Map', la: 'ແຜນທີ່', zh: '地图' },
  'contact.openMap': { en: 'Open in Google Maps', la: 'ເປີດໃນ Google Maps', zh: '在 Google 地图中打开' },
  'contact.scanWechat': { en: 'Scan to add us on WeChat', la: 'ສະແກນເພື່ອເພີ່ມພວກເຮົາໃນ WeChat', zh: '扫码添加微信' },
  'contact.follow': { en: 'Follow us', la: 'ຕິດຕາມພວກເຮົາ', zh: '关注我们' },
  'contact.channels': { en: 'Ways to reach us', la: 'ຊ່ອງທາງຕິດຕໍ່', zh: '联系方式' },
  'contact.formTitle': { en: 'Send us a message', la: 'ສົ່ງຂໍ້ຄວາມຫາພວກເຮົາ', zh: '给我们留言' },
  'contact.mapPending': {
    en: 'The office map will appear here once the address is confirmed.',
    la: 'ແຜນທີ່ຫ້ອງການຈະສະແດງຢູ່ບ່ອນນີ້ເມື່ອຢືນຢັນທີ່ຢູ່ແລ້ວ.',
    zh: '确认地址后，办公室地图将显示在此处。',
  },

  // Forms
  'form.name': { en: 'Full name', la: 'ຊື່ ແລະ ນາມສະກຸນ', zh: '姓名' },
  'form.company': { en: 'Company', la: 'ບໍລິສັດ', zh: '公司名称' },
  'form.country': { en: 'Country', la: 'ປະເທດ', zh: '国家/地区' },
  'form.phone': { en: 'Phone', la: 'ເບີໂທ', zh: '电话' },
  'form.email': { en: 'Email', la: 'ອີເມວ', zh: '电子邮箱' },
  'form.wechat': { en: 'WeChat ID', la: 'WeChat ID', zh: '微信号' },
  'form.interest': { en: 'Service you are interested in', la: 'ບໍລິການທີ່ທ່ານສົນໃຈ', zh: '感兴趣的服务' },
  'form.choose': { en: 'Choose one', la: 'ກະລຸນາເລືອກ', zh: '请选择' },
  'form.other': { en: 'Other', la: 'ອື່ນໆ', zh: '其他' },
  'form.details': { en: 'How can we help?', la: 'ລາຍລະອຽດທີ່ຕ້ອງການ', zh: '需求详情' },
  'form.detailsHint': {
    en: 'Tell us about your plans, timing and any questions.',
    la: 'ບອກພວກເຮົາກ່ຽວກັບແຜນການ, ໄລຍະເວລາ ແລະ ຄຳຖາມຂອງທ່ານ.',
    zh: '请介绍您的计划、时间安排及任何问题。',
  },
  'form.optional': { en: 'optional', la: 'ບໍ່ບັງຄັບ', zh: '选填' },
  'form.requiredNote': {
    en: 'Fields marked * are required.',
    la: 'ຊ່ອງທີ່ມີເຄື່ອງໝາຍ * ແມ່ນຈຳເປັນຕ້ອງກອກ.',
    zh: '标 * 的为必填项。',
  },
  'form.consent': {
    en: 'I agree that MVM GROUP may use these details to reply to my request, as described in the',
    la: 'ຂ້າພະເຈົ້າຍິນຍອມໃຫ້ MVM GROUP ໃຊ້ຂໍ້ມູນນີ້ເພື່ອຕອບກັບຄຳຮ້ອງຂອງຂ້າພະເຈົ້າ ຕາມທີ່ລະບຸໄວ້ໃນ',
    zh: '我同意 MVM 集团使用以上信息回复我的请求，详见',
  },
  'form.sendMessage': { en: 'Send message', la: 'ສົ່ງຂໍ້ຄວາມ', zh: '发送留言' },
  'form.sendQuote': { en: 'Send quote request', la: 'ສົ່ງຄຳຮ້ອງຂໍໃບສະເໜີລາຄາ', zh: '提交报价申请' },
  'form.sendPartner': { en: 'Send application', la: 'ສົ່ງໃບສະໝັກ', zh: '提交申请' },
  'form.sending': { en: 'Sending…', la: 'ກຳລັງສົ່ງ…', zh: '正在提交…' },
  'form.errorRequired': { en: 'Please fill in this field.', la: 'ກະລຸນາກອກຂໍ້ມູນໃນຊ່ອງນີ້.', zh: '请填写此项。' },
  'form.errorEmail': { en: 'Enter an email address like name@company.com.', la: 'ກະລຸນາໃສ່ອີເມວໃຫ້ຖືກຕ້ອງ ເຊັ່ນ name@company.com.', zh: '请输入有效的邮箱地址，例如 name@company.com。' },
  'form.errorChoice': { en: 'Choose at least one option.', la: 'ກະລຸນາເລືອກຢ່າງໜ້ອຍໜຶ່ງລາຍການ.', zh: '请至少选择一项。' },
  'form.errorConsent': { en: 'Tick the box so we can reply to you.', la: 'ກະລຸນາໝາຍຖືກໃນຊ່ອງນີ້ ເພື່ອໃຫ້ພວກເຮົາຕອບກັບທ່ານໄດ້.', zh: '请勾选此项，以便我们回复您。' },
  'form.contactBy': { en: 'Preferred way to reach you', la: 'ຊ່ອງທາງທີ່ສະດວກໃຫ້ຕິດຕໍ່ກັບ', zh: '首选联系方式' },
  'form.servicesNeeded': { en: 'What do you need a quote for?', la: 'ທ່ານຕ້ອງການໃບສະເໜີລາຄາສຳລັບຫຍັງ?', zh: '您需要哪些服务的报价？' },
  'form.selectAll': { en: 'Select all that apply.', la: 'ເລືອກໄດ້ຫຼາຍກວ່າໜຶ່ງ.', zh: '可多选。' },
  'form.projectDetails': { en: 'Describe the work', la: 'ອະທິບາຍລາຍລະອຽດວຽກ', zh: '项目描述' },
  'form.projectHint': {
    en: 'Scope, quantities, locations, languages or anything that helps us price the work.',
    la: 'ຂອບເຂດວຽກ, ຈຳນວນ, ສະຖານທີ່, ພາສາ ຫຼື ຂໍ້ມູນອື່ນທີ່ຊ່ວຍໃຫ້ພວກເຮົາຄິດໄລ່ລາຄາໄດ້.',
    zh: '工作范围、数量、地点、语言或任何有助于我们报价的信息。',
  },
  'form.startDate': { en: 'When do you want to start?', la: 'ທ່ານຕ້ອງການເລີ່ມເມື່ອໃດ?', zh: '计划何时开始？' },
  'form.start.asap': { en: 'As soon as possible', la: 'ໄວທີ່ສຸດ', zh: '尽快' },
  'form.start.month': { en: 'Within a month', la: 'ພາຍໃນ 1 ເດືອນ', zh: '一个月内' },
  'form.start.quarter': { en: 'In 1–3 months', la: 'ພາຍໃນ 1–3 ເດືອນ', zh: '1–3 个月内' },
  'form.start.exploring': { en: 'Just exploring', la: 'ກຳລັງສຶກສາຂໍ້ມູນ', zh: '暂时了解' },
  'form.budget': { en: 'Budget range', la: 'ງົບປະມານ', zh: '预算范围' },
  'form.yourDetails': { en: 'Your details', la: 'ຂໍ້ມູນຂອງທ່ານ', zh: '您的联系信息' },
  'form.aboutRequest': { en: 'About your request', la: 'ກ່ຽວກັບຄຳຮ້ອງຂອງທ່ານ', zh: '需求信息' },
  'form.partnerType': { en: 'How would you like to work with us?', la: 'ທ່ານຢາກຮ່ວມມືກັບພວກເຮົາແບບໃດ?', zh: '您希望以何种方式合作？' },
  'form.brandInterest': { en: 'Brands you are interested in', la: 'ແບຣນທີ່ທ່ານສົນໃຈ', zh: '感兴趣的品牌' },
  'form.allBrands': { en: 'Open to any brand', la: 'ສົນໃຈທຸກແບຣນ', zh: '所有品牌均可' },
  'form.location': { en: 'City / province you cover', la: 'ເມືອງ / ແຂວງທີ່ທ່ານດູແລ', zh: '覆盖城市/省份' },
  'form.businessType': { en: 'Type of business', la: 'ປະເພດທຸລະກິດ', zh: '业务类型' },
  'form.businessHint': {
    en: 'For example: wholesaler, supermarket, restaurant, importer, investor.',
    la: 'ຕົວຢ່າງ: ຮ້ານຂາຍຍົກ, ຊຸບເປີມາເກັດ, ຮ້ານອາຫານ, ຜູ້ນຳເຂົ້າ, ນັກລົງທຶນ.',
    zh: '例如：批发商、超市、餐厅、进口商、投资者。',
  },
  'form.partnerMessage': { en: 'Tell us about your business', la: 'ບອກພວກເຮົາກ່ຽວກັບທຸລະກິດຂອງທ່ານ', zh: '介绍您的业务' },
  'form.partnerHint': {
    en: 'Experience, sales channels, monthly volume or the partnership you have in mind.',
    la: 'ປະສົບການ, ຊ່ອງທາງການຂາຍ, ປະລິມານຕໍ່ເດືອນ ຫຼື ຮູບແບບການຮ່ວມມືທີ່ທ່ານຄິດໄວ້.',
    zh: '经验、销售渠道、月销量或您设想的合作方式。',
  },
  'partner.distributor': { en: 'Become a distributor', la: 'ສະໝັກເປັນຕົວແທນຈຳໜ່າຍ', zh: '成为经销商' },
  'partner.distributorText': {
    en: 'Sell our brands in your city or province.',
    la: 'ຈຳໜ່າຍແບຣນຂອງພວກເຮົາໃນເມືອງ ຫຼື ແຂວງຂອງທ່ານ.',
    zh: '在您所在的城市或省份销售我们的品牌。',
  },
  'partner.retail': { en: 'Stock our products', la: 'ນຳສິນຄ້າໄປວາງຂາຍ', zh: '采购产品上架销售' },
  'partner.retailText': {
    en: 'Shops, supermarkets and restaurants that want to sell our products.',
    la: 'ຮ້ານຄ້າ, ຊຸບເປີມາເກັດ ແລະ ຮ້ານອາຫານທີ່ຕ້ອງການຂາຍສິນຄ້າຂອງພວກເຮົາ.',
    zh: '希望销售我们产品的商店、超市和餐厅。',
  },
  'partner.investment': { en: 'Invest with us', la: 'ຮ່ວມລົງທຶນ', zh: '投资合作' },
  'partner.investmentText': {
    en: 'Joint ventures and investment in new or existing businesses.',
    la: 'ການຮ່ວມທຶນ ແລະ ການລົງທຶນໃນທຸລະກິດໃໝ່ ຫຼື ທຸລະກິດທີ່ມີຢູ່ແລ້ວ.',
    zh: '合资经营及对新业务或现有业务的投资。',
  },
  'partner.business': { en: 'Become a business partner', la: 'ເປັນຄູ່ຮ່ວມທຸລະກິດ', zh: '成为业务合作伙伴' },
  'partner.businessText': {
    en: 'Agencies, suppliers and service providers who want to work together.',
    la: 'ບໍລິສັດຕົວແທນ, ຜູ້ສະໜອງ ແລະ ຜູ້ໃຫ້ບໍລິການທີ່ຕ້ອງການເຮັດວຽກຮ່ວມກັນ.',
    zh: '希望合作的代理机构、供应商和服务商。',
  },

  // Quote page
  'quote.nextTitle': { en: 'What happens next', la: 'ຂັ້ນຕອນຕໍ່ໄປ', zh: '后续流程' },
  'quote.next1': {
    en: 'We review your request and may ask a few questions.',
    la: 'ພວກເຮົາກວດສອບຄຳຮ້ອງຂອງທ່ານ ແລະ ອາດຈະສອບຖາມເພີ່ມເຕີມ.',
    zh: '我们审核您的需求，必要时会向您了解更多信息。',
  },
  'quote.next2': {
    en: 'We send a quotation with scope, timeline and required documents.',
    la: 'ພວກເຮົາສົ່ງໃບສະເໜີລາຄາ ພ້ອມຂອບເຂດວຽກ, ໄລຍະເວລາ ແລະ ເອກະສານທີ່ຕ້ອງໃຊ້.',
    zh: '我们发送报价，包含工作范围、时间安排和所需文件。',
  },
  'quote.next3': {
    en: 'Once you approve, a named coordinator starts the work and keeps you updated.',
    la: 'ເມື່ອທ່ານອະນຸມັດ, ຜູ້ປະສານງານທີ່ຮັບຜິດຊອບຈະເລີ່ມວຽກ ແລະ ລາຍງານຄວາມຄືບໜ້າໃຫ້ທ່ານ.',
    zh: '您确认后，专属协调人将启动工作并随时向您通报进展。',
  },

  // Thank you / 404
  'thanks.title': { en: 'Thank you. We have your message.', la: 'ຂອບໃຈ. ພວກເຮົາໄດ້ຮັບຂໍ້ຄວາມຂອງທ່ານແລ້ວ.', zh: '谢谢，我们已收到您的信息。' },
  'thanks.text': {
    en: 'Our team will reply by email, phone or the channel you chose. If your request is urgent, call or message us directly.',
    la: 'ທີມງານຈະຕອບກັບທາງອີເມວ, ໂທລະສັບ ຫຼື ຊ່ອງທາງທີ່ທ່ານເລືອກ. ຖ້າເປັນເລື່ອງດ່ວນ, ກະລຸນາໂທ ຫຼື ສົ່ງຂໍ້ຄວາມຫາພວກເຮົາໂດຍກົງ.',
    zh: '我们的团队将通过邮件、电话或您选择的方式回复您。如有急事，请直接致电或发消息给我们。',
  },
  'notFound.title': { en: 'This page could not be found', la: 'ບໍ່ພົບໜ້ານີ້', zh: '找不到该页面' },
  'notFound.text': {
    en: 'The link may be out of date. Use the menu or go back to the home page.',
    la: 'ລິ້ງອາດຈະໝົດອາຍຸແລ້ວ. ກະລຸນາໃຊ້ເມນູ ຫຼື ກັບໄປໜ້າຫຼັກ.',
    zh: '该链接可能已失效。请使用菜单或返回首页。',
  },

  // Footer
  'footer.services': { en: 'Services', la: 'ບໍລິການ', zh: '服务' },
  'footer.brands': { en: 'Brands', la: 'ແບຣນ', zh: '品牌' },
  'footer.company': { en: 'Company', la: 'ບໍລິສັດ', zh: '公司' },
  'footer.contact': { en: 'Contact', la: 'ຕິດຕໍ່', zh: '联系' },
  'footer.privacy': { en: 'Privacy policy', la: 'ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ', zh: '隐私政策' },
  'footer.terms': { en: 'Terms of use', la: 'ຂໍ້ກຳນົດການນຳໃຊ້', zh: '使用条款' },
  'footer.rights': { en: 'All rights reserved.', la: 'ສະຫງວນລິຂະສິດ.', zh: '版权所有。' },
  'footer.registration': { en: 'Enterprise registration no.', la: 'ເລກທະບຽນວິສາຫະກິດ', zh: '企业注册号' },

  // Misc
  'misc.placeholder': { en: 'To be added', la: 'ລໍຖ້າເພີ່ມຂໍ້ມູນ', zh: '待补充' },
  'misc.imagePending': { en: 'Photo coming soon', la: 'ຮູບພາບຈະເພີ່ມໃນໄວໆນີ້', zh: '图片即将上线' },
  'misc.playVideo': { en: 'Play video', la: 'ຫຼິ້ນວິດີໂອ', zh: '播放视频' },
  'misc.updated': { en: 'Updated', la: 'ອັບເດດ', zh: '更新于' },
};

export function t(lang: Lang, key: string): string {
  const entry = STRINGS[key];
  if (!entry) {
    console.warn(`[i18n] missing key: ${key}`);
    return key;
  }
  return entry[lang] ?? entry[DEFAULT_LOCALE];
}

const MONTHS: Record<string, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  la: ['ມັງກອນ', 'ກຸມພາ', 'ມີນາ', 'ເມສາ', 'ພຶດສະພາ', 'ມິຖຸນາ', 'ກໍລະກົດ', 'ສິງຫາ', 'ກັນຍາ', 'ຕຸລາ', 'ພະຈິກ', 'ທັນວາ'],
};

export function formatDate(value: unknown, lang: Lang): string {
  if (!value) return '';
  const d = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(d.getTime())) return String(value);
  const day = d.getUTCDate();
  const month = d.getUTCMonth();
  const year = d.getUTCFullYear();
  if (lang === 'zh') return `${year}年${month + 1}月${day}日`;
  return `${day} ${MONTHS[lang === 'la' ? 'la' : 'en'][month]} ${year}`;
}

export function isoDate(value: unknown): string {
  if (!value) return '';
  const d = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}

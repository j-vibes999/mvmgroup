// Categories used by projects, news and the quote form.
// To add a category: add it here AND to the matching `options` list in
// public/admin/config.yml so editors can pick it in the CMS.

export const PROJECT_CATEGORIES = [
  { key: 'business-consulting', icon: 'compass', en: 'Business consulting', la: 'ທີ່ປຶກສາທຸລະກິດ', zh: '商务咨询' },
  { key: 'government-documentation', icon: 'document', en: 'Government documentation', la: 'ເອກະສານທາງລັດ', zh: '政府文件办理' },
  { key: 'translation', icon: 'translate', en: 'Translation', la: 'ແປພາສາ', zh: '翻译' },
  { key: 'import-export', icon: 'box', en: 'Import-export', la: 'ນຳເຂົ້າ-ສົ່ງອອກ', zh: '进出口' },
  { key: 'logistics', icon: 'truck', en: 'Logistics', la: 'ໂລຈິສຕິກ', zh: '物流' },
  { key: 'business-tours', icon: 'users', en: 'Business visits', la: 'ພາລູກຄ້າທັດສະນະສຶກສາ', zh: '商务考察' },
  { key: 'tourism', icon: 'mountain', en: 'Tourism', la: 'ທ່ອງທ່ຽວ', zh: '旅游' },
  { key: 'brand-development', icon: 'jar', en: 'Brand development', la: 'ພັດທະນາແບຣນ', zh: '品牌开发' },
];

export const NEWS_CATEGORIES = [
  { key: 'company-news', icon: 'news', en: 'Company news', la: 'ຂ່າວບໍລິສັດ', zh: '公司新闻' },
  { key: 'investing-in-laos', icon: 'chart', en: 'Investing in Laos', la: 'ການລົງທຶນໃນລາວ', zh: '老挝投资' },
  { key: 'government-documents', icon: 'document', en: 'Government documents', la: 'ເອກະສານທາງລັດ', zh: '政府文件' },
  { key: 'import-export', icon: 'box', en: 'Import-export', la: 'ນຳເຂົ້າ-ສົ່ງອອກ', zh: '进出口' },
  { key: 'logistics', icon: 'truck', en: 'Logistics', la: 'ໂລຈິສຕິກ', zh: '物流' },
  { key: 'travel', icon: 'mountain', en: 'Travel', la: 'ການທ່ອງທ່ຽວ', zh: '旅游' },
  { key: 'brand-news', icon: 'jar', en: 'Brand news', la: 'ຂ່າວແບຣນສິນຄ້າ', zh: '品牌动态' },
];

// Options on the Request a Quote form (brief, section 8). Services link here
// with ?service=<key>.
export const QUOTE_OPTIONS = [
  { key: 'business-consulting', en: 'Business consulting', la: 'ທີ່ປຶກສາທຸລະກິດ', zh: '商务咨询' },
  { key: 'government-documentation', en: 'Government documentation', la: 'ເອກະສານທາງລັດ', zh: '政府文件办理' },
  { key: 'translation', en: 'Translation & interpretation', la: 'ແປພາສາ ແລະ ລ່າມ', zh: '翻译与口译' },
  { key: 'tour', en: 'Tour & travel', la: 'ທ່ອງທ່ຽວ', zh: '旅游出行' },
  { key: 'import-export', en: 'Import-export', la: 'ນຳເຂົ້າ-ສົ່ງອອກ', zh: '进出口' },
  { key: 'logistics', en: 'Logistics', la: 'ໂລຈິສຕິກ', zh: '物流运输' },
  { key: 'product-distribution', en: 'Product distribution', la: 'ຈັດຈຳໜ່າຍສິນຄ້າ', zh: '产品分销' },
];

export const PARTNER_TYPES = ['distributor', 'retail', 'investment', 'business'];

type Term = { key: string; [k: string]: string };
export const findCategory = (list: Term[], key: string) => list.find((c) => c.key === key);
export const label = (item: Term | undefined, lang: string) => (item ? item[lang] || item.en || item.key : '');

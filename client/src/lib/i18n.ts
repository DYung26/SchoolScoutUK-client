import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        search: 'Search',
        compare: 'Compare',
        title: 'UK Schools Guide'
      },
      home: {
        title: 'Find the Perfect School',
        subtitle: 'Compare UK schools and make an informed decision for your child\'s future',
        search: {
          placeholder: 'Search schools...',
          schoolType: 'School Type',
          city: 'City',
          applyFilters: 'Apply Filters'
        }
      },
      schoolTypes: {
        public: 'Public',
        private: 'Private',
        grammar: 'Grammar'
      },
      school: {
        details: 'View Details',
        compare: 'Compare',
        about: 'About the School',
        examResults: 'Exam Results',
        facilities: 'Facilities',
        reviews: 'Reviews',
        noReviews: 'No reviews yet',
        ages: 'Ages {{min}}-{{max}}'
      }
    }
  },
  zh: {
    translation: {
      nav: {
        search: '搜索',
        compare: '比较',
        title: '英国学校指南'
      },
      home: {
        title: '找到理想的学校',
        subtitle: '比较英国学校，为您孩子的未来做出明智的决定',
        search: {
          placeholder: '搜索学校...',
          schoolType: '学校类型',
          city: '城市',
          applyFilters: '应用筛选'
        }
      },
      schoolTypes: {
        public: '公立',
        private: '私立',
        grammar: '文法'
      },
      school: {
        details: '查看详情',
        compare: '比较',
        about: '关于学校',
        examResults: '考试成绩',
        facilities: '设施',
        reviews: '评价',
        noReviews: '暂无评价',
        ages: '年龄 {{min}}-{{max}}'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        search: 'بحث',
        compare: 'مقارنة',
        title: 'دليل المدارس البريطانية'
      },
      home: {
        title: 'اعثر على المدرسة المثالية',
        subtitle: 'قارن بين المدارس البريطانية واتخذ قرارًا مستنيرًا لمستقبل طفلك',
        search: {
          placeholder: 'البحث عن المدارس...',
          schoolType: 'نوع المدرسة',
          city: 'المدينة',
          applyFilters: 'تطبيق الفلترة'
        }
      },
      schoolTypes: {
        public: 'حكومية',
        private: 'خاصة',
        grammar: 'نخبوية'
      },
      school: {
        details: 'عرض التفاصيل',
        compare: 'مقارنة',
        about: 'عن المدرسة',
        examResults: 'نتائج الامتحانات',
        facilities: 'المرافق',
        reviews: 'التقييمات',
        noReviews: 'لا توجد تقييمات بعد',
        ages: 'الأعمار {{min}}-{{max}}'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

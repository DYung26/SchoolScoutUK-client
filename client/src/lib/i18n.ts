import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        search: 'Search',
        compare: 'Compare',
        match: 'Find Best Match',
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
      match: {
        title: 'Find Your Perfect School Match',
        description: 'Tell us about your preferences and we\'ll find the best schools for your child',
        studentAge: 'Student Age',
        schoolType: 'Preferred School Type',
        maxDistance: 'Maximum Distance (miles)',
        focusAreas: 'Areas of Focus',
        academicPriority: 'Academic Importance',
        facilitiesPriority: 'Facilities Importance',
        maxAnnualFee: 'Maximum Annual Fee',
        findSchools: 'Find Matching Schools',
        matchedSchools: 'Best Matching Schools',
        anyType: 'Any Type'
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
      },
      common: {
        previous: 'Previous',
        next: 'Next',
        submit: 'Submit'
      }
    }
  },
  zh: {
    translation: {
      nav: {
        search: '搜索',
        compare: '比较',
        match: '最佳匹配',
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
      match: {
        title: '找到最适合的学校',
        description: '告诉我们您的偏好，我们将为您的孩子找到最佳学校',
        studentAge: '学生年龄',
        schoolType: '首选学校类型',
        maxDistance: '最大距离（英里）',
        focusAreas: '重点领域',
        academicPriority: '学术重要性',
        facilitiesPriority: '设施重要性',
        maxAnnualFee: '最高年费',
        findSchools: '查找匹配学校',
        matchedSchools: '最佳匹配学校',
        anyType: '任何类型'
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
      },
      common: {
        previous: '上一步',
        next: '下一步',
        submit: '提交'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        search: 'بحث',
        compare: 'مقارنة',
        match: 'أفضل تطابق',
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
      match: {
        title: 'ابحث عن المدرسة المثالية',
        description: 'أخبرنا عن تفضيلاتك وسنجد أفضل المدارس لطفلك',
        studentAge: 'عمر الطالب',
        schoolType: 'نوع المدرسة المفضل',
        maxDistance: 'أقصى مسافة (ميل)',
        focusAreas: 'مجالات التركيز',
        academicPriority: 'أهمية الأكاديمية',
        facilitiesPriority: 'أهمية المرافق',
        maxAnnualFee: 'الحد الأقصى للرسوم السنوية',
        findSchools: 'البحث عن المدارس المتطابقة',
        matchedSchools: 'أفضل المدارس المتطابقة',
        anyType: 'أي نوع'
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
      },
      common: {
        previous: 'السابق',
        next: 'التالي',
        submit: 'إرسال'
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
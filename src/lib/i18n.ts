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
      compare: {
        title: 'Compare Schools',
        description: 'Compare up to three schools side by side to make an informed decision',
        selectSchool: 'Select a school to compare',
        maxSchools: 'You can compare up to 3 schools',
        selectToCompare: 'Select schools to start comparing',
        criteria: 'Criteria',
        filters: 'Advanced Filters',
        maxDistance: 'Maximum Distance',
        maxAnnualFees: 'Maximum Annual Fees',
        minGcseScore: 'Minimum GCSE Score',
        applyFilters: 'Apply Filters',
        academicChart: 'Academic Performance',
        facilitiesChart: 'Facilities Comparison',
        demographicsChart: 'Student Demographics',
        feeBreakdown: 'Fee Breakdown',
        photoGallery: 'School Photos'
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
        ages: 'Ages {{min}}-{{max}}',
        type: 'School Type',
        location: 'Location',
        ageRange: 'Age Range',
        gcseResults: 'GCSE Results',
        aLevelResults: 'A-Level Results',
        specialties: 'Specialties',
        annualFees: 'Annual Fees',
        noResults: 'No results available',
        noFees: 'No fees information',
        annualFee: 'Annual Fee'
      },
      common: {
        previous: 'Previous',
        next: 'Next',
        submit: 'Submit'
      },
      reviews: {
        title: 'Reviews',
        rating: 'Rating',
        comment: 'Your Review',
        name: 'Your Name',
        submit: 'Submit Review',
        submitting: 'Submitting...',
        success: 'Review Submitted',
        successMessage: 'Thank you for sharing your experience!',
        error: 'Error',
        writeReview: 'Write a Review',
        noReviews: 'No reviews yet',
        anonymous: 'Anonymous'
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
      compare: {
        title: '学校比较',
        description: '并排比较最多三所学校，做出明智的决定',
        selectSchool: '选择要比较的学校',
        maxSchools: '您最多可以比较3所学校',
        selectToCompare: '选择学校开始比较',
        criteria: '比较项目',
        filters: '高级筛选',
        maxDistance: '最大距离',
        maxAnnualFees: '最高年费',
        minGcseScore: '最低GCSE分数',
        applyFilters: '应用筛选',
        academicChart: '学术表现',
        facilitiesChart: '设施比较',
        demographicsChart: '学生人口统计',
        feeBreakdown: '费用明细',
        photoGallery: '学校照片'
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
        ages: '年龄 {{min}}-{{max}}',
        type: '学校类型',
        location: '位置',
        ageRange: '年龄范围',
        gcseResults: 'GCSE成绩',
        aLevelResults: 'A-Level成绩',
        specialties: '特色项目',
        annualFees: '年费',
        noResults: '暂无成绩信息',
        noFees: '暂无费用信息',
        annualFee: '年费'
      },
      common: {
        previous: '上一步',
        next: '下一步',
        submit: '提交'
      },
      reviews: {
        title: '评价',
        rating: '评分',
        comment: '您的评价',
        name: '您的姓名',
        submit: '提交评价',
        submitting: '提交中...',
        success: '评价已提交',
        successMessage: '感谢您分享您的体验！',
        error: '错误',
        writeReview: '写评价',
        noReviews: '暂无评价',
        anonymous: '匿名'
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
      },
      reviews: {
        title: 'التقييمات',
        rating: 'التقييم',
        comment: 'تقييمك',
        name: 'اسمك',
        submit: 'إرسال التقييم',
        submitting: 'جاري الإرسال...',
        success: 'تم إرسال التقييم',
        successMessage: 'شكراً لمشاركة تجربتك!',
        error: 'خطأ',
        writeReview: 'اكتب تقييماً',
        noReviews: 'لا توجد تقييمات بعد',
        anonymous: 'مجهول'
      },
      compare: {
        title: 'مقارنة المدارس',
        description: 'قارن ما يصل إلى ثلاث مدارس جنبًا إلى جنب لاتخاذ قرار مستنير',
        selectSchool: 'حدد مدرسة للمقارنة',
        maxSchools: 'يمكنك مقارنة ما يصل إلى 3 مدارس',
        selectToCompare: 'حدد المدارس لبدء المقارنة',
        criteria: 'المعايير',
        filters: 'تصفية متقدمة',
        maxDistance: 'أقصى مسافة',
        maxAnnualFees: 'الحد الأقصى للرسوم السنوية',
        minGcseScore: 'الحد الأدنى لدرجات GCSE',
        applyFilters: 'تطبيق التصفية',
        academicChart: 'الأداء الأكاديمي',
        facilitiesChart: 'مقارنة المرافق',
        demographicsChart: 'التركيبة الطلابية',
        feeBreakdown: 'تفصيل الرسوم',
        photoGallery: 'صور المدرسة'
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
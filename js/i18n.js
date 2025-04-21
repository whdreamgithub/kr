// 多语言支持
document.addEventListener('DOMContentLoaded', function() {
    // 初始化国际化
    initI18n();
});

// 初始化国际化功能
function initI18n() {
    // 获取语言选择器
    const languageSelect = document.getElementById('language-select');
    
    // 如果没有语言选择器，直接返回
    if (!languageSelect) return;
    
    // 从localStorage获取已保存的语言，或默认使用简体中文
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'zh-TW';
    
    // 设置语言选择器的值
    languageSelect.value = savedLanguage;
    
    // 初始应用翻译
    applyTranslation(savedLanguage);
    
    // 监听语言选择器的变化
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        
        // 保存选择的语言到localStorage
        localStorage.setItem('selectedLanguage', selectedLanguage);
        
        // 应用翻译
        applyTranslation(selectedLanguage);
    });
}

// 应用翻译
function applyTranslation(language) {
    // 获取所有带有data-i18n属性的元素
    const elements = document.querySelectorAll('[data-i18n]');
    
    // 遍历元素并应用翻译
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key, language);
        
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // 更新页面标题
    updatePageTitle(language);
    
    // 更新HTML的lang属性
    document.documentElement.lang = language;
}

// 获取翻译
function getTranslation(key, language) {
    // 根据键和语言获取翻译
    const keys = key.split('.');
    let translation = translations[language];
    
    // 递归查找嵌套的翻译键
    for (const k of keys) {
        if (translation && translation[k]) {
            translation = translation[k];
        } else {
            return null;
        }
    }
    
    return translation;
}

// 更新页面标题
function updatePageTitle(language) {
    const titleElement = document.querySelector('title');
    if (!titleElement) return;
    
    const currentTitle = titleElement.textContent;
    
    // 根据当前页面更新标题
    if (window.location.pathname.includes('about.html')) {
        titleElement.textContent = getTranslation('about.pageTitle', language) + ' - K&R COMPANY LIMITED';
    } else if (window.location.pathname.includes('products.html')) {
        titleElement.textContent = getTranslation('products.pageTitle', language) + ' - K&R COMPANY LIMITED';
    } else if (window.location.pathname.includes('contact.html')) {
        titleElement.textContent = getTranslation('contact.pageTitle', language) + ' - K&R COMPANY LIMITED';
    } else {
        // 首页或其他页面
        titleElement.textContent = 'K&R COMPANY LIMITED - ' + getTranslation('home.pageTitle', language);
    }
}

// 翻译数据
const translations = {
    // 简体中文翻译
    'zh-CN': {
        // 导航
        nav: {
            home: '首页',
            about: '关于我们',
            products: '产品展示',
            contact: '联系我们'
        },
        // 页面标题
        home: {
            pageTitle: '美妆批发专家',
            hero: {
                title: '全球美妆批发专家',
                subtitle: '为您提供优质化妆品批发服务，连接东亚及东南亚市场',
                button: '浏览产品'
            },
            features: {
                title: '我们的优势',
                global: {
                    title: '全球采购网络',
                    desc: '我们与全球顶级美妆品牌建立了强大的合作关系，确保产品质量和价格优势'
                },
                shipping: {
                    title: '高效物流配送',
                    desc: '完善的物流网络，确保产品快速安全送达中国大陆、香港、台湾及东南亚市场'
                },
                quality: {
                    title: '品质保证',
                    desc: '所有产品均经过严格品控，确保每一件商品都符合最高质量标准'
                },
                service: {
                    title: '专业服务',
                    desc: '提供一站式采购解决方案，专业团队为您提供个性化服务'
                }
            },
            platforms: {
                title: '我们的销售平台',
                desc: 'K&R COMPANY在多个主流电商平台设有官方店铺，为您提供便捷的采购体验',
                douyin: '抖音',
                xiaohongshu: '小红书',
                yangmatou: '洋码头',
                pinduoduo: '拼多多',
                kaola: '考拉',
                tmall: '天猫国际'
            },
            categories: {
                title: '产品类别',
                skincare: '护肤品',
                makeup: '彩妆',
                fragrance: '香水',
                haircare: '美发护发'
            },
            cta: {
                title: '开始您的美妆批发业务',
                desc: '联系我们获取最新产品目录和价格信息',
                button: '立即联系'
            }
        },
        about: {
            pageTitle: '关于我们',
            title: '关于我们',
            intro: {
                title: '公司简介',
                desc1: 'K&R COMPANY LIMITED成立于香港，是一家专注于美妆产品批发业务的公司。我们主要从事批发业务，为中国大陆、香港、台湾、东南亚等地区的平台以及线下客户提供价格优势和优质产品。',
                desc2: '作为美妆行业的专业批发商，我们与全球知名品牌建立了稳固的合作关系，确保产品的真实性和质量。我们的目标是成为连接全球优质美妆产品与亚洲市场的桥梁，帮助我们的客户获得最具竞争力的产品和价格。'
            },
            mission: {
                title: '我们的使命',
                desc: '为亚洲市场提供优质、正品的美妆产品，帮助我们的合作伙伴在竞争激烈的美妆行业中取得成功。'
            },
            vision: {
                title: '我们的愿景',
                desc: '成为亚洲领先的美妆产品批发供应商，建立一个连接全球美妆品牌与亚洲市场的专业平台。'
            },
            values: {
                title: '我们的核心价值观',
                quality: {
                    title: '品质第一',
                    desc: '我们只提供经过严格选择的优质产品，确保每一件商品都达到最高标准。'
                },
                integrity: {
                    title: '诚信经营',
                    desc: '我们以诚信为本，与客户和供应商建立长期互信的合作关系。'
                },
                innovation: {
                    title: '创新精神',
                    desc: '我们不断寻找创新的产品和解决方案，帮助客户在市场中脱颖而出。'
                },
                customer: {
                    title: '客户至上',
                    desc: '我们始终将客户的需求放在首位，提供专业、贴心的服务。'
                }
            },
            scope: {
                title: '业务范围',
                desc: 'K&R COMPANY LIMITED在中国大陆的著名电商平台如抖音、小红书、洋码头、拼多多、考拉、淘宝、天猫国际等开展美妆产品销售业务。我们为线上和线下的批发客户提供多样化的美妆产品，包括护肤品、彩妆、香水、护发产品等。',
                platforms: '销售平台',
                products: '产品种类',
                brands: '合作品牌'
            },
            why: {
                title: '为什么选择我们',
                reason1: {
                    title: '丰富的产品线',
                    desc: '我们提供来自全球各地的美妆产品，覆盖多个品类和价位，满足不同客户的需求。'
                },
                reason2: {
                    title: '具竞争力的价格',
                    desc: '直接与品牌和制造商合作，确保我们的客户能够获得最具竞争力的价格。'
                },
                reason3: {
                    title: '高效的物流系统',
                    desc: '我们的物流网络覆盖亚洲主要市场，确保产品快速、安全地送达客户手中。'
                },
                reason4: {
                    title: '专业的团队',
                    desc: '我们的团队拥有丰富的美妆行业经验，能够为客户提供专业的建议和支持。'
                }
            },
            cta: {
                title: '成为我们的合作伙伴',
                desc: '让我们一起开拓美妆市场，共创商业成功',
                button: '联系我们'
            }
        },
        products: {
            pageTitle: '产品展示',
            title: '产品展示',
            intro: {
                title: '我们的产品',
                desc: 'K&R COMPANY LIMITED提供多样化的美妆产品，包括护肤品、彩妆、香水和护发产品等。我们与全球知名品牌合作，确保所有产品都是正品且品质优良。以下是我们的部分产品展示，如需完整的产品目录和价格信息，请与我们联系。'
            },
            filter: {
                all: '全部',
                skincare: '护肤品',
                makeup: '彩妆',
                fragrance: '香水',
                haircare: '美发护发'
            },
            skincare: {
                title: '护肤品',
                product1: {
                    name: '高级保湿霜',
                    desc: '提供持久保湿效果，适合各种肤质使用'
                },
                product2: {
                    name: '精华液',
                    desc: '含有丰富的活性成分，深层滋养肌肤'
                },
                product3: {
                    name: '洁面乳',
                    desc: '温和清洁，不刺激肌肤'
                },
                product4: {
                    name: '面膜套装',
                    desc: '针对不同肌肤问题的专业解决方案'
                }
            },
            makeup: {
                title: '彩妆',
                product1: {
                    name: '粉底液',
                    desc: '轻薄质地，持久遮瑕，自然妆效'
                },
                product2: {
                    name: '眼影盘',
                    desc: '多色组合，打造多样妆容'
                },
                product3: {
                    name: '口红',
                    desc: '丝绒质地，色彩饱满，不易脱色'
                },
                product4: {
                    name: '睫毛膏',
                    desc: '浓密卷翘，不晕染，易卸除'
                }
            },
            fragrance: {
                title: '香水',
                product1: {
                    name: '女士香水',
                    desc: '花香调，清新典雅，持久留香'
                },
                product2: {
                    name: '男士香水',
                    desc: '木质调，成熟稳重，彰显魅力'
                },
                product3: {
                    name: '香氛套装',
                    desc: '香水、沐浴露、身体乳三件套'
                },
                product4: {
                    name: '中性香水',
                    desc: '清新果香，男女皆宜'
                }
            },
            haircare: {
                title: '美发护发',
                product1: {
                    name: '洗发水',
                    desc: '温和清洁，滋养发丝'
                },
                product2: {
                    name: '护发素',
                    desc: '深层滋养，修复受损发质'
                },
                product3: {
                    name: '发膜',
                    desc: '密集修护，令秀发柔顺亮泽'
                },
                product4: {
                    name: '造型产品',
                    desc: '定型喷雾，不伤发质，易于造型'
                }
            },
            inquiry: {
                title: '批发询价',
                desc: '我们为批发客户提供优惠的价格和完善的服务。如需了解更多产品信息或获取报价，请填写以下信息，我们的销售团队将尽快与您联系。',
                company: '公司名称',
                contact: '联系人',
                email: '电子邮箱',
                phone: '联系电话',
                message: '询价产品和要求',
                submit: '提交询价'
            },
            cta: {
                title: '需要更多产品信息？',
                desc: '我们可以根据您的需求提供定制化的产品方案',
                button: '联系我们'
            }
        },
        contact: {
            pageTitle: '联系我们',
            title: '联系我们',
            address: {
                title: '公司地址',
                line: '香港观塘京业街61-63号丽仁大厦1楼122室'
            },
            phone: {
                title: '联系电话'
            },
            email: {
                title: '电子邮箱'
            },
            hours: {
                title: '营业时间',
                time: '周一至周五: 9:00 - 18:00'
            },
            map: {
                title: '我们的位置'
            },
            form: {
                title: '联系表单',
                desc: '如有任何问题或需求，请填写以下表单，我们将尽快回复您',
                name: '姓名',
                company: '公司',
                email: '电子邮箱',
                phone: '电话',
                subject: '主题',
                message: '消息',
                submit: '发送消息'
            },
            faq: {
                title: '常见问题',
                q1: '你们提供哪些产品？',
                a1: '我们提供多种美妆产品，包括护肤品、彩妆、香水和护发产品等。我们与全球知名品牌合作，确保所有产品都是正品且品质优良。',
                q2: '如何获取产品价格和目录？',
                a2: '您可以通过填写我们网站上的询价表单或直接发送电子邮件至krcompany6@gmail.com获取最新的产品价格和目录。',
                q3: '你们的最低起订量是多少？',
                a3: '我们的最低起订量根据不同产品而有所不同。请联系我们的销售团队获取具体信息。',
                q4: '你们提供哪些付款方式？',
                a4: '我们接受银行转账、PayPal和其他主要的国际支付方式。具体付款方式会在订单确认后提供。',
                q5: '你们能发货到哪些国家或地区？',
                a5: '我们主要服务中国大陆、香港、台湾和东南亚地区的客户，但也可以根据需求安排到其他国家和地区的配送。'
            }
        },
        footer: {
            tagline: '您的美妆批发合作伙伴',
            contact: '联系方式',
            address: '香港观塘京业街61-63号丽仁大厦1楼122室',
            quicklinks: '快速链接',
            rights: '版权所有'
        }
    },
    
    // 繁体中文翻译
    'zh-TW': {
        nav: {
            home: '首頁',
            about: '關於我們',
            products: '產品展示',
            contact: '聯繫我們'
        },
        home: {
            pageTitle: '美妝批發專家',
            hero: {
                title: '全球美妝批發專家',
                subtitle: '為您提供優質化妝品批發服務，連接東亞及東南亞市場',
                button: '瀏覽產品'
            },
            features: {
                title: '我們的優勢',
                global: {
                    title: '全球採購網絡',
                    desc: '我們與全球頂級美妝品牌建立了強大的合作關係，確保產品質量和價格優勢'
                },
                shipping: {
                    title: '高效物流配送',
                    desc: '完善的物流網絡，確保產品快速安全送達中國大陸、香港、台灣及東南亞市場'
                },
                quality: {
                    title: '品質保證',
                    desc: '所有產品均經過嚴格品控，確保每一件商品都符合最高質量標準'
                },
                service: {
                    title: '專業服務',
                    desc: '提供一站式採購解決方案，專業團隊為您提供個性化服務'
                }
            },
            platforms: {
                title: '我們的銷售平台',
                desc: 'K&R COMPANY在多個主流電子商務平台設有官方店鋪，為您提供便捷的採購體驗',
                douyin: '抖音',
                xiaohongshu: '小紅書',
                yangmatou: '洋碼頭',
                pinduoduo: '拼多多',
                kaola: '考拉',
                tmall: '天貓國際'
            },
            categories: {
                title: '產品類別',
                skincare: '護膚品',
                makeup: '彩妝',
                fragrance: '香水',
                haircare: '美髮護髮'
            },
            cta: {
                title: '開始您的美妝批發業務',
                desc: '聯繫我們獲取最新產品目錄和價格信息',
                button: '立即聯繫'
            }
        },
        about: {
            pageTitle: '關於我們',
            title: '關於我們',
            intro: {
                title: '公司簡介',
                desc1: 'K&R COMPANY LIMITED成立於香港，是一家專注於美妝產品批發業務的公司。我們主要從事批發業務，為中國大陸、香港、台灣、東南亞等地的平台以及線下客戶提供價格優勢和優質產品。',
                desc2: '作為美妝行業的專業批發商，我們與全球知名品牌建立了穩固的合作關係，確保產品的真實性和質量。我們的目標是成為連接全球優質美妝產品與亞洲市場的橋樑，幫助我們的客戶獲得最具競爭力的產品和價格。'
            },
            mission: {
                title: '我們的使命',
                desc: '為亞洲市場提供優質、正品的美妝產品，幫助我們的合作夥伴在競爭激烈的美妝行業中取得成功。'
            },
            vision: {
                title: '我們的願景',
                desc: '成為亞洲領先的美妝產品批發供應商，建立一個連接全球美妝品牌與亞洲市場的專業平台。'
            },
            values: {
                title: '我們的核心價值觀',
                quality: {
                    title: '品質第一',
                    desc: '我們只提供經過嚴格選擇的優質產品，確保每一件商品都達到最高標準。'
                },
                integrity: {
                    title: '誠信經營',
                    desc: '我們以誠信為本，與客戶和供應商建立長期互信的合作關係。'
                },
                innovation: {
                    title: '創新精神',
                    desc: '我們不斷尋找創新的產品和解決方案，幫助客戶在市場中脫穎而出。'
                },
                customer: {
                    title: '客戶至上',
                    desc: '我們始終將客戶的需求放在首位，提供專業、貼心的服務。'
                }
            },
            scope: {
                title: '業務範圍',
                desc: 'K&R COMPANY LIMITED在中國大陸的著名電子商務平台如抖音、小紅書、洋碼頭、拼多多、考拉、淘寶、天貓國際等開展美妝產品銷售業務。我們為線上和線下的批發客戶提供多樣化的美妝產品，包括護膚品、彩妝、香水、護髮產品等。',
                platforms: '銷售平台',
                products: '產品種類',
                brands: '合作品牌'
            },
            why: {
                title: '為什麼選擇我們',
                reason1: {
                    title: '豐富的產品線',
                    desc: '我們提供來自全球各地的美妝產品，覆蓋多個品類和價位，滿足不同客戶的需求。'
                },
                reason2: {
                    title: '具競爭力的價格',
                    desc: '直接與品牌和制造商合作，確保我們的客戶能夠獲得最具競爭力的價格。'
                },
                reason3: {
                    title: '高效的物流系統',
                    desc: '我們的物流網絡覆蓋亞洲主要市場，確保產品快速、安全地送達客戶手中。'
                },
                reason4: {
                    title: '專業的團隊',
                    desc: '我們的團隊擁有豐富的美妝行業經驗，能夠為客戶提供專業的建議和支持。'
                }
            },
            cta: {
                title: '成為我們的合作夥伴',
                desc: '讓我們一起開拓美妝市場，共創商業成功',
                button: '聯繫我們'
            }
        },
        products: {
            pageTitle: '產品展示',
            title: '產品展示',
            intro: {
                title: '我們的產品',
                desc: 'K&R COMPANY LIMITED提供多樣化的美妝產品，包括護膚品、彩妝、香水和護髮產品等。我們與全球知名品牌合作，確保所有產品都是正品且品質優良。以下是我們的部分產品展示，如需完整的產品目錄和價格信息，請與我們聯繫。'
            },
            filter: {
                all: '全部',
                skincare: '護膚品',
                makeup: '彩妝',
                fragrance: '香水',
                haircare: '美髮護髮'
            },
            skincare: {
                title: '護膚品',
                product1: {
                    name: '高級保濕霜',
                    desc: '提供持久保濕效果，適合各種膚質使用'
                },
                product2: {
                    name: '精華液',
                    desc: '含有豐富的活性成分，深層滋養肌膚'
                },
                product3: {
                    name: '潔面乳',
                    desc: '溫和清潔，不刺激肌膚'
                },
                product4: {
                    name: '面膜套裝',
                    desc: '針對不同肌膚問題的專業解決方案'
                }
            },
            makeup: {
                title: '彩妝',
                product1: {
                    name: '粉底液',
                    desc: '輕薄質地，持久遮瑕，自然妝效'
                },
                product2: {
                    name: '眼影盤',
                    desc: '多色組合，打造多樣妝容'
                },
                product3: {
                    name: '口紅',
                    desc: '絲絨質地，色彩飽滿，不易脫色'
                },
                product4: {
                    name: '睫毛膏',
                    desc: '濃密卷翹，不暈染，易卸除'
                }
            },
            fragrance: {
                title: '香水',
                product1: {
                    name: '女士香水',
                    desc: '花香調，清新典雅，持久留香'
                },
                product2: {
                    name: '男士香水',
                    desc: '木質調，成熟穩重，彰顯魅力'
                },
                product3: {
                    name: '香氛套裝',
                    desc: '香水、沐浴露、身體乳三件套'
                },
                product4: {
                    name: '中性香水',
                    desc: '清新果香，男女皆宜'
                }
            },
            haircare: {
                title: '美髮護髮',
                product1: {
                    name: '洗發水',
                    desc: '溫和清潔，滋養發絲'
                },
                product2: {
                    name: '護髮素',
                    desc: '深層滋養，修復受損發質'
                },
                product3: {
                    name: '發膜',
                    desc: '密集修護，令秀發柔順亮澤'
                },
                product4: {
                    name: '造型產品',
                    desc: '定型噴霧，不傷發質，易于造型'
                }
            },
            inquiry: {
                title: '批發詢價',
                desc: '我們為批發客戶提供優惠的價格和完善的服務。如需了解更多產品信息或獲取報價，請填寫以下信息，我們的銷售團隊將盡快與您聯繫。',
                company: '公司名稱',
                contact: '聯繫人',
                email: '電子郵箱',
                phone: '聯繫電話',
                message: '詢價產品和要求',
                submit: '提交詢價'
            },
            cta: {
                title: '需要更多產品信息？',
                desc: '我們可以根據您的需求提供定制化的產品方案',
                button: '聯繫我們'
            }
        },
        contact: {
            pageTitle: '聯繫我們',
            title: '聯繫我們',
            address: {
                title: '公司地址',
                line: '香港觀塘京業街61-63號麗仁大廈1樓122室'
            },
            phone: {
                title: '聯繫電話'
            },
            email: {
                title: '電子郵箱'
            },
            hours: {
                title: '營業時間',
                time: '周一至周五: 9:00 - 18:00'
            },
            map: {
                title: '我們的位置'
            },
            form: {
                title: '聯繫表單',
                desc: '如有任何問題或需求，請填寫以下表單，我們將盡快回覆您',
                name: '姓名',
                company: '公司',
                email: '電子郵箱',
                phone: '電話',
                subject: '主題',
                message: '消息',
                submit: '發送消息'
            },
            faq: {
                title: '常見問題',
                q1: '你們提供哪些產品？',
                a1: '我們提供多種美妝產品，包括護膚品、彩妝、香水和護髮產品等。我們與全球知名品牌合作，確保所有產品都是正品且品質優良。',
                q2: '如何獲取產品價格和目錄？',
                a2: '您可以通過填寫我們網站上的詢價表單或直接發送電子郵件至krcompany6@gmail.com獲取最新的產品價格和目錄。',
                q3: '你們的最低起訂量是多少？',
                a3: '我們的最低起訂量根據不同產品而有所不同。請聯繫我們的銷售團隊獲取具體信息。',
                q4: '你們提供哪些付款方式？',
                a4: '我們接受銀行轉帳、PayPal和其他主要的國際支付方式。具體付款方式會在訂單確認後提供。',
                q5: '你們能發貨到哪些國家或地區？',
                a5: '我們主要服務中國大陸、香港、台灣和東南亞地區的客戶，但也可以根據需求安排到其他國家和地區的配送。'
            }
        },
        footer: {
            tagline: '您的美妝批發合作夥伴',
            contact: '聯繫方式',
            address: '香港觀塘京業街61-63號麗仁大廈1樓122室',
            quicklinks: '快速鏈接',
            rights: '版權所有'
        }
    },
    
    // 英文翻译
    'en': {
        nav: {
            home: 'Home',
            about: 'About Us',
            products: 'Products',
            contact: 'Contact'
        },
        home: {
            pageTitle: 'Beauty Wholesale Specialist',
            hero: {
                title: 'Global Beauty Wholesale Specialist',
                subtitle: 'Providing premium cosmetics wholesale services, connecting East Asia and Southeast Asia markets',
                button: 'Browse Products'
            },
            features: {
                title: 'Our Advantages',
                global: {
                    title: 'Global Sourcing Network',
                    desc: 'We have established strong partnerships with top beauty brands worldwide, ensuring product quality and price advantages'
                },
                shipping: {
                    title: 'Efficient Logistics',
                    desc: 'Complete logistics network, ensuring fast and safe delivery to mainland China, Hong Kong, Taiwan, and Southeast Asia markets'
                },
                quality: {
                    title: 'Quality Assurance',
                    desc: 'All products undergo strict quality control to ensure each item meets the highest quality standards'
                },
                service: {
                    title: 'Professional Service',
                    desc: 'Providing one-stop procurement solutions, our professional team offers personalized services'
                }
            },
            platforms: {
                title: 'Our Sales Platforms',
                desc: 'K&R COMPANY has official stores on multiple mainstream e-commerce platforms, providing convenient procurement experience',
                douyin: 'Douyin',
                xiaohongshu: 'Xiaohongshu',
                yangmatou: 'Yangmatou',
                pinduoduo: 'Pinduoduo',
                kaola: 'Kaola',
                tmall: 'Tmall International'
            },
            categories: {
                title: 'Product Categories',
                skincare: 'Skincare',
                makeup: 'Makeup',
                fragrance: 'Fragrance',
                haircare: 'Hair Care'
            },
            cta: {
                title: 'Start Your Beauty Wholesale Business',
                desc: 'Contact us for the latest product catalog and pricing information',
                button: 'Contact Now'
            }
        },
        about: {
            pageTitle: 'About Us',
            title: 'About Us',
            intro: {
                title: 'Company Profile',
                desc1: 'K&R COMPANY LIMITED, established in Hong Kong, is a company focused on beauty products wholesale business. We mainly engage in wholesale business, providing price advantages and quality products to platforms and offline customers in mainland China, Hong Kong, Taiwan, Southeast Asia and other regions.',
                desc2: 'As a professional wholesaler in the beauty industry, we have established stable partnerships with globally renowned brands, ensuring the authenticity and quality of products. Our goal is to become a bridge connecting high-quality beauty products worldwide with the Asian market, helping our customers obtain the most competitive products and prices.'
            },
            mission: {
                title: 'Our Mission',
                desc: 'To provide high-quality, authentic beauty products to the Asian market, helping our partners succeed in the competitive beauty industry.'
            },
            vision: {
                title: 'Our Vision',
                desc: 'To become a leading beauty product wholesale supplier in Asia, establishing a professional platform connecting global beauty brands with the Asian market.'
            },
            values: {
                title: 'Our Core Values',
                quality: {
                    title: 'Quality First',
                    desc: 'We only provide carefully selected quality products, ensuring that each item meets the highest standards.'
                },
                integrity: {
                    title: 'Integrity',
                    desc: 'We operate with integrity, establishing long-term trusting relationships with customers and suppliers.'
                },
                innovation: {
                    title: 'Innovation',
                    desc: 'We continuously seek innovative products and solutions to help customers stand out in the market.'
                },
                customer: {
                    title: 'Customer First',
                    desc: 'We always put customers\' needs first, providing professional and attentive service.'
                }
            },
            scope: {
                title: 'Business Scope',
                desc: 'K&R COMPANY LIMITED conducts beauty product sales business on famous e-commerce platforms in mainland China such as Douyin, Xiaohongshu, Yangmatou, Pinduoduo, Kaola, Taobao, and Tmall International. We provide diversified beauty products for online and offline wholesale customers, including skincare, makeup, fragrance, and hair care products.',
                platforms: 'Sales Platforms',
                products: 'Product Types',
                brands: 'Partner Brands'
            },
            why: {
                title: 'Why Choose Us',
                reason1: {
                    title: 'Rich Product Line',
                    desc: 'We offer beauty products from around the world, covering multiple categories and price points to meet the needs of different customers.'
                },
                reason2: {
                    title: 'Competitive Prices',
                    desc: 'Working directly with brands and manufacturers to ensure our customers get the most competitive prices.'
                },
                reason3: {
                    title: 'Efficient Logistics',
                    desc: 'Our logistics network covers major Asian markets, ensuring products are delivered quickly and safely to customers.'
                },
                reason4: {
                    title: 'Professional Team',
                    desc: 'Our team has extensive experience in the beauty industry and can provide professional advice and support to customers.'
                }
            },
            cta: {
                title: 'Become Our Partner',
                desc: 'Let\'s explore the beauty market together and create business success',
                button: 'Contact Us'
            }
        },
        products: {
            pageTitle: 'Products',
            title: 'Products',
            intro: {
                title: 'Our Products',
                desc: 'K&R COMPANY LIMITED offers diverse beauty products, including skincare, makeup, fragrances, and hair care products. We collaborate with globally renowned brands, ensuring all products are authentic and of excellent quality. Below is a display of some of our products. For a complete product catalog and pricing information, please contact us.'
            },
            filter: {
                all: 'All',
                skincare: 'Skincare',
                makeup: 'Makeup',
                fragrance: 'Fragrance',
                haircare: 'Hair Care'
            },
            skincare: {
                title: 'Skincare',
                product1: {
                    name: 'Premium Moisturizer',
                    desc: 'Provides long-lasting hydration, suitable for all skin types'
                },
                product2: {
                    name: 'Serum',
                    desc: 'Rich in active ingredients, deeply nourishes the skin'
                },
                product3: {
                    name: 'Facial Cleanser',
                    desc: 'Gentle cleansing, non-irritating to the skin'
                },
                product4: {
                    name: 'Mask Set',
                    desc: 'Professional solutions for different skin concerns'
                }
            },
            makeup: {
                title: 'Makeup',
                product1: {
                    name: 'Foundation',
                    desc: 'Lightweight texture, long-lasting coverage, natural finish'
                },
                product2: {
                    name: 'Eyeshadow Palette',
                    desc: 'Multiple color combinations for various makeup looks'
                },
                product3: {
                    name: 'Lipstick',
                    desc: 'Velvet texture, saturated color, long-lasting'
                },
                product4: {
                    name: 'Mascara',
                    desc: 'Voluminous and curling, no smudging, easy to remove'
                }
            },
            fragrance: {
                title: 'Fragrance',
                product1: {
                    name: 'Women\'s Perfume',
                    desc: 'Floral notes, fresh and elegant, long-lasting'
                },
                product2: {
                    name: 'Men\'s Cologne',
                    desc: 'Woody notes, mature and steady, showcasing charm'
                },
                product3: {
                    name: 'Fragrance Set',
                    desc: 'Three-piece set including perfume, shower gel, and body lotion'
                },
                product4: {
                    name: 'Unisex Fragrance',
                    desc: 'Fresh fruity notes, suitable for both men and women'
                }
            },
            haircare: {
                title: 'Hair Care',
                product1: {
                    name: 'Shampoo',
                    desc: 'Gentle cleansing, nourishes hair strands'
                },
                product2: {
                    name: 'Conditioner',
                    desc: 'Deep nourishment, repairs damaged hair'
                },
                product3: {
                    name: 'Hair Mask',
                    desc: 'Intensive repair, makes hair smooth and shiny'
                },
                product4: {
                    name: 'Styling Products',
                    desc: 'Setting spray, hair-friendly, easy to style'
                }
            },
            inquiry: {
                title: 'Wholesale Inquiry',
                desc: 'We provide favorable prices and comprehensive services for wholesale customers. For more product information or to get a quote, please fill in the information below, and our sales team will contact you as soon as possible.',
                company: 'Company Name',
                contact: 'Contact Person',
                email: 'Email',
                phone: 'Phone',
                message: 'Inquiry Products and Requirements',
                submit: 'Submit Inquiry'
            },
            cta: {
                title: 'Need More Product Information?',
                desc: 'We can provide customized product solutions based on your needs',
                button: 'Contact Us'
            }
        },
        contact: {
            pageTitle: 'Contact Us',
            title: 'Contact Us',
            address: {
                title: 'Company Address',
                line: 'FLAT/RM 122 1/F LIVEN HOUSE 61-63 KING YIP STREET KWUN TONG, HONG KONG'
            },
            phone: {
                title: 'Phone'
            },
            email: {
                title: 'Email'
            },
            hours: {
                title: 'Business Hours',
                time: 'Monday to Friday: 9:00 - 18:00'
            },
            map: {
                title: 'Our Location'
            },
            form: {
                title: 'Contact Form',
                desc: 'If you have any questions or needs, please fill out the form below, and we will reply to you as soon as possible',
                name: 'Name',
                company: 'Company',
                email: 'Email',
                phone: 'Phone',
                subject: 'Subject',
                message: 'Message',
                submit: 'Send Message'
            },
            faq: {
                title: 'Frequently Asked Questions',
                q1: 'What products do you offer?',
                a1: 'We offer a variety of beauty products, including skincare, makeup, fragrances, and hair care products. We collaborate with globally renowned brands, ensuring all products are authentic and of excellent quality.',
                q2: 'How can I get product prices and catalogs?',
                a2: 'You can get the latest product prices and catalogs by filling out the inquiry form on our website or by sending an email directly to krcompany6@gmail.com.',
                q3: 'What is your minimum order quantity?',
                a3: 'Our minimum order quantity varies depending on different products. Please contact our sales team for specific information.',
                q4: 'What payment methods do you accept?',
                a4: 'We accept bank transfers, PayPal, and other major international payment methods. Specific payment methods will be provided after order confirmation.',
                q5: 'Which countries or regions can you ship to?',
                a5: 'We primarily serve customers in mainland China, Hong Kong, Taiwan, and Southeast Asia, but we can also arrange deliveries to other countries and regions as needed.'
            }
        },
        footer: {
            tagline: 'Your Beauty Wholesale Partner',
            contact: 'Contact Information',
            address: 'FLAT/RM 122 1/F LIVEN HOUSE 61-63 KING YIP STREET KWUN TONG, HONG KONG',
            quicklinks: 'Quick Links',
            rights: 'All Rights Reserved'
        }
    }
};
import React, { useState } from 'react';
import {
  X,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Coins,
  Users,
  Briefcase,
  Terminal,
  Award,
  Layers,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock,
  Building2,
  UserCheck
} from 'lucide-react';

export default function PlatformGuideModal({ isOpen, onClose, onNavigate, isRtl = true }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'freelancer' | 'client' | 'escrow'
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '680px',
          width: '100%',
          padding: '28px',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#f0fdfa',
                color: 'var(--qudra-teal-deep)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #99f6e4'
              }}
            >
              <HelpCircle size={22} color="var(--qudra-teal)" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {isRtl ? 'دليل استخدام منصة قُدرة الميسّر' : 'Simple QUDRA User Guide'}
              </h2>
              <p style={{ fontSize: '12.5px', color: 'var(--slate-500)', margin: '2px 0 0' }}>
                {isRtl
                  ? 'فهم سريع ومباشر لفكرة المنصة وكيف تستفيد منها في دقائق'
                  : 'A quick, simple breakdown of how QUDRA works for you'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--slate-400)',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}
        >
          {[
            { id: 'overview', labelAr: 'فكرة المنصة باختصار', labelEn: 'Overview' },
            { id: 'freelancer', labelAr: 'دليل المستقل (أنا محترف)', labelEn: 'For Freelancers' },
            { id: 'client', labelAr: 'دليل الشركات (أنا عميل)', labelEn: 'For Clients' },
            { id: 'escrow', labelAr: 'الضمان المالي (0% عمولة)', labelEn: '0% Escrow' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#ffffff' : 'transparent',
                color: activeTab === tab.id ? 'var(--slate-900)' : 'var(--slate-600)',
                fontWeight: activeTab === tab.id ? '800' : '500',
                fontSize: '12.5px',
                cursor: 'pointer',
                boxShadow: activeTab === tab.id ? 'var(--shadow-xs)' : 'none'
              }}
            >
              {isRtl ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Tab Content: 1) Overview */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', lineHeight: 1.6, fontSize: '13.5px', color: 'var(--slate-700)' }}>
            <div style={{ backgroundColor: '#f0fdfa', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid #ccfbf1' }}>
              <strong style={{ color: '#006666', display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                {isRtl ? 'ما هي منصة قُدرة في سطرين؟' : 'What is QUDRA in two lines?'}
              </strong>
              {isRtl
                ? 'قُدرة هي منصة تعاقد ذكية للمحترفين التقنيين والشركات، تعتمد على «إثبات المهارة الفعلي من الكود والشهادات» بدلاً من السير الذاتية التقليدية، وتضمن حقوق الطرفين عبر حساب ضمان بنكي بدون عمولات خفية.'
                : 'QUDRA is a verified talent platform matching skilled professionals with enterprise projects based on proven code & credentials under zero-commission escrow.'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: '#f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Award size={16} color="var(--qudra-teal)" />
                  <strong style={{ fontSize: '13px', color: 'var(--slate-900)' }}>{isRtl ? '1. جواز القدرات المعتمد' : '1. Capability Passport'}</strong>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--slate-600)', margin: 0 }}>
                  {isRtl ? 'ملفك المهني يُبنى تلقائياً من مشاريعك وحساباتك السابقة (GitHub، الشهادات)، ليعرف العميل خبرتك الحقيقية فوراً.' : 'Your profile is built from real code commits and credentials.'}
                </p>
              </div>

              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: '#f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Sparkles size={16} color="#b45309" />
                  <strong style={{ fontSize: '13px', color: 'var(--slate-900)' }}>{isRtl ? '2. مطابقة ذكية بدون عشوائية' : '2. Explainable Matching'}</strong>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--slate-600)', margin: 0 }}>
                  {isRtl ? 'بدلاً من أن تنافس مئات الأشخاص على خفض السعر، النظام يقترح عليك المشاريع التي تطابق ما تجيده بدقة مع شرح الأسباب.' : 'No race to the bottom; transparent skill-to-problem matching.'}
                </p>
              </div>

              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: '#f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Coins size={16} color="#16a34a" />
                  <strong style={{ fontSize: '13px', color: 'var(--slate-900)' }}>{isRtl ? '3. ضمان بنكي كامل (0% عمولة)' : '3. 0% Fee Escrow'}</strong>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--slate-600)', margin: 0 }}>
                  {isRtl ? 'قيمة المشروع توضع في حساب بنكي مجمد قبل أن تبدأ العمل، وتتحول لحسابك فور تسليم كل مرحلة بدون أي اقتطاع.' : 'Funds are locked before work starts, releasing directly to your IBAN with 0% fees.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: 2) For Freelancer */}
        {activeTab === 'freelancer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
              {isRtl ? 'رحلتك كمستقل أو مبرمج محترف في 3 خطوات:' : 'Your Freelancer Journey in 3 Simple Steps:'}
            </h4>

            {[
              {
                step: '1',
                title: isRtl ? 'اربط حساباتك أو وثّق مهارة بتحدٍّ عملي' : 'Connect accounts or solve a quick challenge',
                desc: isRtl ? 'من قسم «ربط الحسابات» أو «التحديات البرمجية»، اربط GitHub أو اجتز تمريناً عملياً في 20 دقيقة ليحصل ملفك على شارة موثق.' : 'Connect GitHub or pass an automated test to get verified.'
              },
              {
                step: '2',
                title: isRtl ? 'تصفح المشاريع وقدم عرضك بثقة' : 'Browse matched projects & submit with proof',
                desc: isRtl ? 'من قسم «تصفح المشاريع»، ستجد مشاريع الشركات مرتبة حسب نسبة توافقها مع مهاراتك. لا تحتاج لكتابة خطابات طويلة؛ ملفك الموثق يكفي.' : 'Apply with your verified passport instead of lengthy cover letters.'
              },
              {
                step: '3',
                title: isRtl ? 'سلّم المراحل واستلم أموالك في حسابك البنكي' : 'Deliver milestones & receive 100% of your money',
                desc: isRtl ? 'من «مساحة عمل المشروع»، تابع تسليم كل مرحلة. فور اعتماد العميل، يتم تحويل المبلغ كاملاً للآيبان البنكي المسجل لديك بدون أي عمولة.' : 'Direct bank transfer to your IBAN with zero platform commission.'
              }
            ].map((s) => (
              <div key={s.step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '12px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--qudra-teal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px', flexShrink: 0 }}>
                  {s.step}
                </div>
                <div>
                  <strong style={{ color: 'var(--slate-900)', fontSize: '13.5px' }}>{s.title}</strong>
                  <p style={{ margin: '3px 0 0', color: 'var(--slate-600)', fontSize: '12.5px', lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: 3) For Client */}
        {activeTab === 'client' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
              {isRtl ? 'رحلتك كصاحب عمل أو منشأة تبحث عن كفاءات:' : 'Your Client Journey in 3 Simple Steps:'}
            </h4>

            {[
              {
                step: '1',
                title: isRtl ? 'اكتب فكرة مشروعك وسنقوم بتوصيفها' : 'Input project scope & requirements',
                desc: isRtl ? 'من قسم «توصيف المشروع»، اكتب ما تريد تنفيذه باللغة العادية، وسيقوم النظام بتحديد المهارات المعمارية الدقيقة المطلوبة.' : 'Write what you want in plain words; the system maps exact required skills.'
              },
              {
                step: '2',
                title: isRtl ? 'احصل على أفضل مرشح أو شكّل فريقاً متكاملاً' : 'Get matched with top talent or compose a squad',
                desc: isRtl ? 'النظام يرشح لك الكفاءات التي لديها كود مثبت ومشاريع مماثلة بالفعل مع شرح رياضي لسبب اختيارهم، أو يشكّل لك فريقاً يغطي 100% من متطلباتك.' : 'Deterministic matching backed by proven deliverables and zero skill gaps.'
              },
              {
                step: '3',
                title: isRtl ? 'ادفع بأمان عبر الضمان المالي المرحلي' : 'Pay safely through milestone escrow',
                desc: isRtl ? 'أموالك لا تُصرف للمستقل إلا بعد فحص واستلام كل مرحلة والموافقة عليها بنفسك، مع توثيق مخرجات المشروع في سجل غير قابل للتعديل.' : 'Zero risk: funds release only upon your deliverable sign-off.'
              }
            ].map((s) => (
              <div key={s.step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '12px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--qudra-obsidian)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px', flexShrink: 0 }}>
                  {s.step}
                </div>
                <div>
                  <strong style={{ color: 'var(--slate-900)', fontSize: '13.5px' }}>{s.title}</strong>
                  <p style={{ margin: '3px 0 0', color: 'var(--slate-600)', fontSize: '12.5px', lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: 4) Escrow Guarantee */}
        {activeTab === 'escrow' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <ShieldCheck size={24} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#166534', fontSize: '14px', display: 'block', marginBottom: '4px' }}>
                  {isRtl ? 'ضمان مالي بنكي 100% بدون أي عمولة مقتطعة' : '100% Bank Escrow with 0% Platform Commission'}
                </strong>
                <p style={{ color: '#166534', margin: 0, fontSize: '12.5px', lineHeight: 1.55 }}>
                  {isRtl
                    ? 'في منصات العمل التقليدية يتم خصم 10% إلى 20% من أتعابك كعمولة خفية. في قُدرة: إذا اتفق الطرفان على 60,000 ر.س، فإن المستقل يستلم 60,000 ر.س كاملة إلى حسابه البنكي مباشرة.'
                    : 'Unlike traditional platforms that take 10-20% cuts, QUDRA guarantees 100% of the agreed amount reaches the developer.'}
                </p>
              </div>
            </div>

            <div style={{ padding: '14px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <strong style={{ color: 'var(--slate-900)', display: 'block', marginBottom: '6px' }}>
                {isRtl ? 'كيف تتم حماية أموال المشروع؟' : 'How does escrow protection work?'}
              </strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--slate-600)', fontSize: '12px' }}>
                <div>• <strong>قبل بدء المشروع:</strong> يقوم العميل بإيداع قيمة المرحلة في حساب الضمان البنكي المحمي.</div>
                <div>• <strong>أثناء العمل:</strong> يعمل المستقل وهو مطمئن أن أمواله محجوزة ومضمونة بنكياً.</div>
                <div>• <strong>عند التسليم:</strong> يعتمد العميل المخرجات، ويتم تحويل المبلغ فوراً إلى آيبان المستقل دون أي تأخير.</div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-color)', marginTop: '4px' }}>
          <span style={{ fontSize: '12px', color: 'var(--slate-500)' }}>
            {isRtl ? 'منصة قُدرة · معتمدة وفق معايير الحوسبة السحابية والأمن السيبراني' : 'QUDRA Platform · Built for Verified Talent'}
          </span>

          <button
            onClick={onClose}
            className="btn btn-primary btn-sm"
            style={{
              backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
              color: '#ffffff',
              fontWeight: '800',
              padding: '7px 18px',
              fontSize: '12.5px'
            }}
          >
            {isRtl ? 'فهمت، ابدأ الاستخدام' : 'Got it, let’s start'}
          </button>
        </div>
      </div>
    </div>
  );
}

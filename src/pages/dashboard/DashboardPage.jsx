import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useTheme } from "next-themes";
import {
  Bell,
  Briefcase,
  CreditCard,
  FileEdit,
  FileText,
  Moon,
  ShieldCheck,
  Sun,
  UserCircle2,
  X,
  Download,
  Printer,
  CalendarDays,
  Mail,
  Phone,
  MapPin,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDashboardData } from "@/lib/mockDashboardApi";

function getNoticeStyles(type, isLight) {
  if (isLight) {
    switch (type) {
      case "success":
        return "border-emerald-200 bg-emerald-50/90";
      case "warning":
        return "border-amber-200 bg-amber-50/95";
      case "primary":
        return "border-sky-200 bg-sky-50/95";
      default:
        return "border-slate-200 bg-white";
    }
  }

  switch (type) {
    case "success":
      return "border-emerald-400/20 bg-emerald-500/10";
    case "warning":
      return "border-amber-400/20 bg-amber-500/10";
    case "primary":
      return "border-sky-400/20 bg-sky-500/10";
    default:
      return "border-white/10 bg-white/5";
  }
}

function StatPill({ icon: Icon, label, value, isLight }) {
  return (
    <div
      className={`group rounded-2xl border px-3 py-2.5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 ${
        isLight
          ? "border-transparent bg-slate-100/70 hover:bg-slate-100"
          : "border-transparent bg-white/[0.04] hover:bg-white/[0.07]"
      }`}
    >
      <div
        className={`mb-2 flex items-center gap-2 ${
          isLight ? "text-slate-500" : "text-white/60"
        }`}
      >
        <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
        <span className="text-xs uppercase tracking-[0.18em]">{label}</span>
      </div>
      <div
        className={`text-[13px] sm:text-sm font-medium ${
          isLight ? "text-slate-900" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function NoticeCard({ notice, isLight }) {
  return (
    <div
      className={`rounded-3xl border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${getNoticeStyles(
        notice.type,
        isLight,
      )}`}
    >
      <div
        className={`mb-2 text-sm font-semibold ${
          isLight ? "text-slate-900" : "text-white"
        }`}
      >
        {notice.title}
      </div>
      <p
        className={`text-sm leading-7 ${
          isLight ? "text-slate-600" : "text-white/72"
        }`}
      >
        {notice.body}
      </p>
      <button
        className={`mt-4 inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium transition ${
          isLight
            ? "border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            : "border-white/10 bg-white/6 text-white/85 hover:bg-white/10"
        }`}
        type="button"
      >
        {notice.cta}
      </button>
    </div>
  );
}

function NotificationDropdown({ open, notifications, onClose, isLight }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP (mobile only) */}
          <div
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm sm:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`
    z-[9999] border shadow-xl transition-all
    ${isLight ? "bg-white border-slate-200" : "bg-slate-900 border-white/10"}

    fixed bottom-0 left-0 right-0 w-full sm:h-auto sm:overflow-visible rounded-t-3xl p-4

    sm:absolute sm:left-auto sm:bottom-auto 
    sm:absolute sm:top-16 sm:left-4 sm:w-[320px]
    sm:max-h-[700px] sm:rounded-2xl sm:p-2  pb-4 sm:pb-5
  `}
          >
            {/* DRAG HANDLE (mobile only) */}
            <div className="mb-3 flex justify-center sm:hidden">
              <div className="h-1.5 w-10 rounded-full bg-slate-300 dark:bg-white/20" />
            </div>

            {/* HEADER */}
            <div className="mb-2 flex items-center justify-between px-2 py-2">
              <h3
                className={`text-sm font-semibold ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                Notifications
              </h3>

              <button
                type="button"
                onClick={onClose}
                className={`rounded-lg p-1 transition ${
                  isLight
                    ? "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* LIST */}
            <div className="space-y-3 pb-6">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-2xl border p-3 transition-all duration-300 ${
                    isLight
                      ? "border-transparent bg-slate-100/60 hover:bg-emerald-50"
                      : "border-transparent bg-white/[0.04] hover:bg-white/[0.07]"
                  }`}
                >
                  <div
                    className={`mb-1 text-[13px] sm:text-sm font-medium ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {item.title}
                  </div>

                  <p
                    className={`text-xs leading-6 ${
                      isLight ? "text-slate-600" : "text-white/65"
                    }`}
                  >
                    {item.message}
                  </p>

                  <p
                    className={`mt-2 text-[11px] ${
                      isLight ? "text-emerald-600" : "text-emerald-300/80"
                    }`}
                  >
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
function IDField({ label, value }) {
  return (
    <div className="rounded-[18px] border border-[#d9ddd8] bg-[#fbfcfb] px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.24em] text-[#7b847f]">
        {label}
      </p>
      <p className="mt-1 text-[13px] font-bold text-[#1c2520] sm:text-[15px]">
        {value}
      </p>
    </div>
  );
}

function FakeQR() {
  const cells = Array.from({ length: 64 }, (_, i) => i);
  const filled = new Set([
    0, 1, 2, 3, 4, 6, 8, 10, 11, 12, 14, 16, 17, 18, 20, 22, 24, 26, 27, 28, 30,
    32, 33, 35, 36, 38, 40, 41, 42, 44, 46, 48, 50, 51, 52, 54, 56, 58, 60, 61,
    62, 63,
  ]);

  return (
    <div className="rounded-[14px] border border-[#d7dbd6] bg-white p-2">
      <div className="grid grid-cols-8 gap-[2px]">
        {cells.map((cell) => (
          <div
            key={cell}
            className={`aspect-square rounded-[2px] ${
              filled.has(cell) ? "bg-[#111111]" : "bg-[#eef1ee]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function IDCardFront({ user }) {
  return (
    <div className="id-card scale-[0.75] sm:scale-100 origin-top">
      <div className="w-full h-full overflow-hidden rounded-[26px] border border-[#cfd5cf] bg-[#f7f8f6] shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
        <div className="relative h-full">
          <div className="relative overflow-hidden border-b border-[#d7dbd6] bg-white">
            <div className="absolute inset-0">
              <div className="absolute left-0 top-0 h-full w-full bg-[#1e7a33]" />
              <div className="absolute right-[-5%] top-0 h-full w-[38%] skew-x-[-36deg] bg-[#e0c320]" />
              <div className="absolute left-[18%] top-0 h-full w-[18%] skew-x-[-36deg] bg-[#0f5c26]/95" />
              <div className="absolute right-[18%] top-0 h-full w-[16%] skew-x-[-36deg] bg-[#0f5c26]/95" />
            </div>

            <div className="relative z-10 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
              <div>
                <p className="text-[14px] font-extrabold uppercase tracking-[0.02em] text-white sm:text-[18px]">
                  National Youth Service Corps
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/95 sm:text-[12px]">
                  Corps Member Identity Card
                </p>
              </div>

              <img
                src="/logo.png"
                alt="NYSC"
                className="h-12 w-12 rounded-full bg-white object-contain p-1.5 shadow-md sm:h-16 sm:w-16"
              />
            </div>
          </div>

          <div className="grid h-[calc(100%-78px)] grid-cols-[140px_1fr] gap-3 p-3 sm:grid-cols-[168px_1fr] sm:gap-5 sm:p-6">
            <div className="flex flex-col rounded-[20px] border border-[#d7dbd6] bg-[#f2eee8] p-2 sm:p-3">
              <div className="rounded-[18px] border border-[#e2e4df] bg-white p-1">
                <div className="w-full aspect-[4/5] overflow-hidden rounded-[14px]">
                  <img
                    src={user.photo}
                    alt={user.fullName}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="mt-auto pt-3">
                <p className="text-[8px] uppercase tracking-[0.24em] text-[#6e766f] sm:text-[10px]">
                  Corps Member Signature
                </p>
                <div className="mt-2 h-[1px] bg-[#82b997]" />
              </div>
            </div>
            <div className="grid content-start gap-2 sm:gap-4">
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <IDField label="Full Name" value={user.fullName} />
                <IDField label="State Code" value={user.stateCode} />
                <IDField label="Date of Birth" value={user.dateOfBirth} />
                <IDField label="Sex" value="Male" />
                <IDField label="Call-Up Number" value={user.callupNo} />
                <IDField label="Blood Group" value={user.bloodGroup} />
                <IDField label="State of Origin" value={user.stateOfOrigin} />
                <IDField
                  label="State of Deployment"
                  value={user.stateOfDeployment}
                />
              </div>
              <div className="mt-1 grid gap-3 border-t border-[#d7dbd6] pt-3 sm:mt-2 sm:grid-cols-3 sm:gap-5 sm:pt-5">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.24em] text-[#6e766f] sm:text-[10px]">
                    Corps Member Signature
                  </p>
                  <div className="mt-3 h-[1px] bg-[#cfd5cf]" />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.24em] text-[#6e766f] sm:text-[10px]">
                    DG’s Signature
                  </p>
                  <div className="mt-3 h-[1px] bg-[#cfd5cf]" />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.24em] text-[#6e766f] sm:text-[10px]">
                    Valid Till
                  </p>
                  <p className="mt-2 text-[13px] font-bold text-[#1b1f1c] sm:text-[16px]">
                    24-March-2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function IDCardBack({ user }) {
  return (
    <div className="id-card scale-[0.75] sm:scale-100 origin-top">
      <div className="w-full h-full overflow-hidden rounded-[26px] border border-[#cfd5cf] bg-[#f7f8f6] shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
        <div className="relative h-full">
          <div className="relative overflow-hidden border-b border-[#d7dbd6] bg-white">
            <div className="absolute inset-0">
              <div className="absolute left-0 top-0 h-full w-full bg-[#458f36]" />
              <div className="absolute right-[-5%] top-0 h-full w-[40%] skew-x-[-36deg] bg-[#e0c320]" />
              <div className="absolute left-[22%] top-0 h-full w-[18%] skew-x-[-36deg] bg-[#127332]/95" />
            </div>
            <div className="relative z-10 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
              <p className="text-[14px] font-extrabold uppercase tracking-[0.02em] text-white sm:text-[18px]">
                National Youth Service Corps
              </p>
              <img
                src="/logo.png"
                alt="NYSC"
                className="h-12 w-12 rounded-full bg-white object-contain p-1.5 shadow-md sm:h-16 sm:w-16"
              />
            </div>
          </div>
          <div className="grid h-[calc(100%-78px)] grid-cols-[1fr_96px] gap-3 p-3 sm:grid-cols-[1fr_160px] sm:gap-5 sm:p-6">
            <div className="rounded-[22px] border border-[#d7dbd6] bg-white/70 p-4 sm:p-6">
              <p className="text-[10px] leading-6 text-[#4e5852] sm:text-[12px] sm:leading-7">
                Emergency/NOK: <span className="font-bold">{user.gsm}</span>
              </p>
              <p className="mt-4 text-[10px] leading-6 text-[#4e5852] sm:text-[12px] sm:leading-7">
                This identity card is an official document and related only to
                the person described. Impersonation of the authorized holder,
                card alteration, destruction, transfer to another person, or use
                of this card for criminal offences will be met with appropriate
                sanctions.
              </p>
              <div className="mt-5">
                <p className="text-[10px] font-semibold text-[#1d6f30] sm:text-[12px]">
                  If found, please return to:
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase text-[#1d6f30] sm:text-[12px]">
                  National Directorate Headquarters
                </p>
              </div>
              <div className="mt-6 border-t border-[#d7dbd6] pt-4">
                <p className="text-[8px] uppercase tracking-[0.22em] text-[#6e766f] sm:text-[10px]">
                  Card Verification
                </p>
                <p className="mt-2 text-[10px] leading-6 text-[#4e5852] sm:text-[12px] sm:leading-7">
                  Use the QR area to verify corps member identity details on the
                  portal.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-3 rounded-[22px] border border-[#d7dbd6] bg-[#f3f5f2] p-3 sm:p-4">
              <div className="rounded-[16px] border border-[#d7dbd6] bg-white p-2">
                <FakeQR />
              </div>
              <div className="rounded-[16px] border border-[#d7dbd6] bg-white px-3 py-3 text-center">
                <p className="text-[8px] uppercase tracking-[0.22em] text-[#6e766f] sm:text-[10px]">
                  Valid Till
                </p>
                <p className="mt-2 text-[12px] font-bold text-[#1b1f1c] sm:text-[15px]">
                  24-March-2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function HiddenPDFCard({ cardRef, children }) {
  return (
    <div
      ref={cardRef}
      className="fixed left-[-10000px] top-0 bg-white p-8"
      style={{ width: "900px" }}
    >
      {children}
    </div>
  );
}
function IDCardModal({ open, onClose, user, isLight }) {
  const frontPreviewRef = useRef(null);
  const backPreviewRef = useRef(null);
  const frontPdfRef = useRef(null);
  const backPdfRef = useRef(null);
  const exportCardToCanvas = async (element) => {
    return html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });
  };
  const handleDownloadPDF = async () => {
    if (!frontPdfRef.current || !backPdfRef.current) return;
    const frontCanvas = await exportCardToCanvas(frontPdfRef.current);
    const backCanvas = await exportCardToCanvas(backPdfRef.current);
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [frontCanvas.width, frontCanvas.height],
    });
    const addCanvasToPage = (canvas, addNewPage = false) => {
      if (addNewPage) {
        pdf.addPage([canvas.width, canvas.height], "landscape");
      }
      const imgData = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
    };
    addCanvasToPage(frontCanvas, false);
    addCanvasToPage(backCanvas, true);
    pdf.save("nysc-id-card.pdf");
  };
  const handlePrint = async () => {
    if (!frontPdfRef.current || !backPdfRef.current) return;
    const frontCanvas = await exportCardToCanvas(frontPdfRef.current);
    const backCanvas = await exportCardToCanvas(backPdfRef.current);
    const frontImg = frontCanvas.toDataURL("image/png");
    const backImg = backCanvas.toDataURL("image/png");
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(` 
<html> 
<head> 
<title>NYSC ID Card</title> 
<style> 
@page { 
size: A4 landscape; 
margin: 0; 
} 
html, body { 
margin: 0; 
padding: 0; 
background: white; 
} 
body { 
display: flex; 
flex-direction: column; 
align-items: center; 
justify-content: center; 
-webkit-print-color-adjust: exact; 
print-color-adjust: exact; 
} 
.page { 
width: 100%; 
height: 100vh; 
display: flex; 
align-items: center; 
justify-content: center; 
page-break-after: always; 
} 
.page:last-child { 
page-break-after: auto; 
} 
img { 
width: 95%; 
height: auto; 
object-fit: contain; 
} 
</style> 
</head> 
<body> 
<div class="page"><img src="${frontImg}" alt="Front ID Card" /></div> 
<div class="page"><img src="${backImg}" alt="Back ID Card" /></div> 
</body> 
</html> 
`);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[130] bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed inset-0 z-[140] flex items-center justify-center p-3 sm:p-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <div
              className={`w-full max-w-[95vw] sm:max-w-4xl lg:max-w-6xl rounded-[24px] sm:rounded-[32px] border p-3 sm:p-6 shadow-2xl backdrop-blur-2xl ${
                isLight
                  ? "border-slate-200 bg-white/95"
                  : "border-white/10 bg-slate-950/90"
              }`}
            >
              <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2
                    className={`text-lg font-semibold ${isLight ? "text-slate-900" : "text-white"}`}
                  >
                    Corps Member Identity Card
                  </h2>
                  <p
                    className={`text-sm ${isLight ? "text-slate-500" : "text-white/60"}`}
                  >
                    View, print, or download your redesigned NYSC ID card in
                    full front and back format.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    onClick={handlePrint}
                    className={
                      isLight
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button
                    type="button"
                    onClick={handleDownloadPDF}
                    className="bg-emerald-600 text-white hover:bg-emerald-500"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button
                    type="button"
                    onClick={onClose}
                    className="bg-red-500/90 text-white hover:bg-red-500"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Close
                  </Button>
                </div>
              </div>
              <div
                className={`max-h-[85vh] sm:max-h-[78vh] overflow-auto rounded-3xl border p-4 sm:p-5 ${
                  isLight
                    ? "border-slate-200 bg-slate-50/70"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="space-y-5">
                  <div ref={frontPreviewRef}>
                    <IDCardFront user={user} />
                  </div>
                  <div ref={backPreviewRef}>
                    <IDCardBack user={user} />
                  </div>
                </div>
              </div>
              <HiddenPDFCard cardRef={frontPdfRef}>
                <IDCardFront user={user} />
              </HiddenPDFCard>
              <HiddenPDFCard cardRef={backPdfRef}>
                <IDCardBack user={user} />
              </HiddenPDFCard>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
function SummaryRow({ label, value, isLight }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
        isLight
          ? "bg-slate-100/70 hover:bg-slate-100"
          : "bg-white/[0.04] hover:bg-white/[0.07]"
      }`}
    >
      <span
        className={`text-sm ${isLight ? "text-slate-500" : "text-white/55"}`}
      >
        {label}
      </span>
      <span
        className={`text-[13px] sm:text-sm font-medium${
          isLight ? "text-slate-900" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
function QuickAction({ icon: Icon, label, isLight }) {
  return (
    <button
      type="button"
      className={`group flex items-center gap-3 rounded-2xl px-4 py-4 text-left text-sm transition-all duration-300 hover:-translate-y-0.5 ${
        isLight
          ? "bg-slate-100/70 hover:bg-slate-100"
          : "bg-white/[0.04] hover:bg-white/[0.07]"
      }`}
    >
      <div
        className={`rounded-xl p-2 ${
          isLight ? "bg-emerald-50" : "bg-emerald-500/10"
        }`}
      >
        <Icon
          className={`h-4 w-4 ${
            isLight ? "text-emerald-600" : "text-emerald-300"
          }`}
        />
      </div>
      <span className="font-medium">{label}</span>
    </button>
  );
}
export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showIDCard, setShowIDCard] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [countdown, setCountdown] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCountdown(timeString);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      const data = await getDashboardData();
      if (isMounted) {
        setDashboard(data);
        setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);
  const currentTheme = mounted ? resolvedTheme || theme || "dark" : "dark";
  const isLight = currentTheme === "light";
  if (loading || !dashboard) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${
          isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-white"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className={`rounded-3xl border px-6 py-5 backdrop-blur-xl flex items-center gap-3 ${
            isLight
              ? "border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)]"
              : "border-white/10 bg-white/5"
          }`}
        >
          {/* 🔥 SPINNER */}
          <div className="h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />

          {/* TEXT */}
          <span className="text-sm font-medium">Loading dashboard...</span>
        </motion.div>
      </div>
    );
  }
  const { user, meta, notices, notifications } = dashboard;
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isLight
          ? "bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] text-slate-900"
          : "bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.10),transparent_25%),#020617] text-white"
      }`}
    >
      <div className="flex min-h-screen">
        <main className="relative z-10 flex-1">
          <div className="mx-auto max-w-[1700px] px-3 py-4 sm:p-5 lg:p-8 overflow-visible">
            <header
              className={`relative z-[200] mb-6 rounded-[28px] overflow-visible p-3 sm:p-4 xl:p-6 transition-all 
bg-[linear-gradient(135deg,#065f46_0%,#047857_40%,#065f46_100%)] 
shadow-[0_20px_60px_rgba(6,95,70,0.55)] 
border border-white/10`}
            >
              {/* Animated NYSC background */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute whitespace-nowrap text-[120px] font-extrabold uppercase text-white/10 tracking-widest animate-marquee mix-blend-overlay">
                  NYSC • NYSC • NYSC • NYSC • NYSC • NYSC • NYSC • NYSC
                </div>
              </div>{" "}
              <div className="flex flex-col justify-center gap-3 sm:gap-4 xl:flex-row xl:items-center xl:justify-between min-h-[130px] sm:min-h-[unset]">
                <div className="flex items-start justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between w-full">
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        {meta.dashboardTitle}
                      </div>
                    </div>
                    <h1 className="mt-1 text-2xl sm:text-xl xl:text-3xl font-semibold text-white leading-[1.25]">
                      Welcome back, Isaac
                    </h1>
                    <p className="mt-1 text-[11px] sm:text-xs text-white/80">
                      Manage your service year efficiently.
                    </p>
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 flex items-center justify-between sm:justify-end w-full gap-3 sm:gap-4">
                  {/* BUTTON ROW (HORIZONTAL) */}
                  <div className="flex items-center gap-2 sm:gap-3 relative">
                    <div className="relative z-[999]">
                      <button
                        type="button"
                        onClick={() => setShowNotifications((prev) => !prev)}
                        className="relative rounded-xl border border-white/20 bg-white/10 p-1.5 sm:p-3 text-white backdrop-blur-md transition hover:bg-white/20"
                      >
                        <Bell className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                        <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-semibold text-white animate-premium-pulse">
                          {notifications.length}
                        </span>
                      </button>
                      <NotificationDropdown
                        open={showNotifications}
                        notifications={notifications}
                        onClose={() => setShowNotifications(false)}
                        isLight={isLight}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setTheme(currentTheme === "dark" ? "light" : "dark")
                      }
                      className="rounded-xl border border-white/20 bg-white/10 p-1.5 sm:p-3 text-white backdrop-blur-md transition hover:bg-white/20"
                    >
                      {currentTheme === "dark" ? (
                        <Sun className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                      ) : (
                        <Moon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                      )}
                    </button>
                    <Button
                      type="button"
                      onClick={() => setShowIDCard(true)}
                      className="h-9 sm:h-10 xl:h-12 
px-3 sm:px-4 xl:px-5 
text-xs sm:text-sm 
rounded-xl xl:rounded-2xl 
bg-white text-emerald-700 
shadow-[0_8px_25px_rgba(255,255,255,0.35)] 
hover:bg-emerald-50 
transition-all duration-300"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      View ID Card
                    </Button>
                  </div>
                  {/* RIGHT: DATE + TIME */}
                  <div className="pr-1 sm:pr-0 text-[10px] sm:text-xs text-white/70 text-right leading-tight">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                    <div className="text-[11px] font-medium tracking-tight">
                      {countdown}
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <section className="relative z-10 mb-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`rounded-3xl border p-5 transition-all duration-300 ${
                  isLight
                    ? "border-slate-200 bg-white shadow-[0_4px_12px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
                    : "border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.06]"
                }`}
              >
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div
                      className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${
                        isLight
                          ? "border-slate-200 bg-white text-slate-600"
                          : "border-white/10 bg-white/5 text-white/70"
                      }`}
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {user.email}
                    </div>
                    <h2
                      className={`text-2xl font-semibold sm:text-3xl ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}
                    >
                      Dashboard | Basic Details
                    </h2>
                    <p
                      className={`mt-2 max-w-2xl text-sm leading-7 ${
                        isLight ? "text-slate-600" : "text-white/65"
                      }`}
                    >
                      Review your biodata, core service information, and
                      important service-year actions from one organized
                      dashboard.
                    </p>
                  </div>
                  <div className="relative mx-auto sm:mx-0 sm:ml-auto">
                    <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl" />
                    <img
                      src={user.photo}
                      alt={user.fullName}
                      className={`relative h-16 w-16 sm:h-28 sm:w-28 rounded-full border object-cover shadow-lg sm:h-28 sm:w-28 ${
                        isLight ? "border-white" : "border-white/15"
                      }`}
                    />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <StatPill
                    icon={UserCircle2}
                    label="Name"
                    value={user.fullName}
                    isLight={isLight}
                  />
                  <StatPill
                    icon={CalendarDays}
                    label="Batch"
                    value={user.batch}
                    isLight={isLight}
                  />
                  <StatPill
                    icon={Mail}
                    label="Email"
                    value={user.email}
                    isLight={isLight}
                  />
                  <StatPill
                    icon={Phone}
                    label="GSM"
                    value={user.gsm}
                    isLight={isLight}
                  />
                  <StatPill
                    icon={MapPin}
                    label="State Code"
                    value={user.stateCode}
                    isLight={isLight}
                  />
                  <StatPill
                    icon={HeartPulse}
                    label="HMO"
                    value={user.hmo}
                    isLight={isLight}
                  />
                  <StatPill
                    icon={FileText}
                    label="Call-Up No"
                    value={user.callupNo}
                    isLight={isLight}
                  />
                  <StatPill
                    icon={ShieldCheck}
                    label="NHIS No"
                    value={user.nhisNo}
                    isLight={isLight}
                  />
                  <StatPill
                    icon={Briefcase}
                    label="Course"
                    value={user.course}
                    isLight={isLight}
                  />
                </div>
                <div
                  className={`mt-5 rounded-3xl border p-4 text-sm leading-7 transition-all duration-300 ${
                    isLight
                      ? "border-slate-200 bg-white text-slate-600"
                      : "border-white/10 bg-white/5 text-white/70"
                  }`}
                >
                  <p>
                    Click the link to login to the NHIA portal using your
                    Call-up Number and NHIA Number as password.
                  </p>
                  <p
                    className={`mt-3 italic ${isLight ? "text-slate-500" : "text-white/55"}`}
                  >
                    Please note: You cannot apply for DOB correction after you
                    have been documented in camp.
                  </p>
                  <p className="mt-3">
                    Ensure that your Graduation Date, Date of Birth and Course
                    of Study are going to appear on your Certificate of National
                    Service.
                  </p>
                  <p className="mt-3">
                    Ensure the above are correct before documentation in camp.
                  </p>
                  <p className="mt-3">
                    Ensure you print your green card slip, sign it and bring it
                    to camp. It is compulsory for registration in camp.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button className="h-10 rounded-2xl bg-emerald-600 px-5 text-white hover:bg-emerald-500">
                    Print Slip
                  </Button>
                  <Button
                    className={`h-10 rounded-2xl px-5 ${
                      isLight
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    Relocation
                  </Button>
                  <Button
                    className={`h-10 rounded-2xl px-5 ${
                      isLight
                        ? "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    Apply for Correction/Rearrangement
                  </Button>
                </div>
              </motion.div>
              <div className="grid gap-4">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-3xl border p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 ${
                    isLight
                      ? "border-slate-200/60 bg-white/80 shadow-[0_4px_12px_rgba(15,23,42,0.05)]"
                      : "border-white/10 bg-white/[0.04]"
                  }`}
                >
                  <div className="mb-4 flex items-center gap-2">
                    <Sparkles
                      className={`h-4 w-4 ${isLight ? "text-emerald-600" : "text-emerald-300"}`}
                    />
                    <h3
                      className={`text-lg font-semibold ${isLight ? "text-slate-900" : "text-white"}`}
                    >
                      Full Record Summary
                    </h3>
                  </div>
                  <div className="grid gap-2">
                    <SummaryRow
                      label="Matric No."
                      value={user.matricNo}
                      isLight={isLight}
                    />
                    <SummaryRow
                      label="Date of Birth"
                      value={user.dateOfBirth}
                      isLight={isLight}
                    />
                    <SummaryRow
                      label="Institution"
                      value={user.institution}
                      isLight={isLight}
                    />
                    <SummaryRow
                      label="Course"
                      value={user.course}
                      isLight={isLight}
                    />
                    <SummaryRow
                      label="Award"
                      value={user.award}
                      isLight={isLight}
                    />
                    <SummaryRow
                      label="State of Origin"
                      value={user.stateOfOrigin}
                      isLight={isLight}
                    />
                    <SummaryRow
                      label="State of Deployment"
                      value={user.stateOfDeployment}
                      isLight={isLight}
                    />
                    <SummaryRow
                      label="Blood Group"
                      value={user.bloodGroup}
                      isLight={isLight}
                    />
                  </div>
                </motion.div>
                <div
                  className={`rounded-3xl border p-5 backdrop-blur-xl transition-all duration-300 ${
                    isLight
                      ? "border-slate-200/60 bg-white/80 shadow-[0_4px_12px_rgba(15,23,42,0.05)]"
                      : "border-white/10 bg-white/[0.04]"
                  }`}
                >
                  <h3
                    className={`mb-4 text-lg font-semibold ${isLight ? "text-slate-900" : "text-white"}`}
                  >
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <QuickAction
                      icon={FileEdit}
                      label="Course Correction"
                      isLight={isLight}
                    />
                    <QuickAction
                      icon={FileText}
                      label="PPA Letter"
                      isLight={isLight}
                    />
                    <QuickAction
                      icon={ShieldCheck}
                      label="LGA Clearance"
                      isLight={isLight}
                    />
                    <QuickAction
                      icon={Briefcase}
                      label="SAED Registration"
                      isLight={isLight}
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="grid gap-4">
              {notices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} isLight={isLight} />
              ))}
            </section>
          </div>
        </main>
      </div>
      <IDCardModal
        open={showIDCard}
        onClose={() => setShowIDCard(false)}
        user={user}
        isLight={isLight}
      />
    </div>
  );
}

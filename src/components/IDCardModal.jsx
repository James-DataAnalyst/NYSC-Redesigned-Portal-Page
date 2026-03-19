import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Download, Printer, X } from "lucide-react";

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
                <IDField
                  label="Sex"
                  value={user.gender === "M" ? "Male" : "Female"}
                />
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

// ================= HIDDEN PDF =================
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

export default IDCardModal;

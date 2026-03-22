export async function getDashboardData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          fullName: "Isaac James Ajani",
          email: "jamex361@gmail.com",
          batch: "A, 2025",
          gender: "M",
          gsm: "07066844128",
          callupNo: "NYSC/FE/2025/000558",
          stateCode: "NS/25A/1133",
          nhisNo: "7622652-0",
          hmo: "ZUMA HT",
          stateOfOrigin: "Kwara",
          stateOfDeployment: "Nasarawa",
          bloodGroup: "B-",
          dateOfBirth: "23/07/1998",
          institution: "Obafemi Awolowo University",
          course: "Agricultural Science",
          award: "BSC.",
          matricNo: "ANS/2016/066",
          photo: "/profile.jpg",
        },
        meta: {
          dashboardTitle: "NYSC Registration Portal",
          currentDate: "Wednesday, March 18, 2026",
        },
        notices: [
          {
            id: 1,
            type: "success",
            title: "Correction / Rearrangement of Name",
            body: "If the spelling or arrangement shown above is incorrect, apply for correction or rearrangement of name.",
            cta: "Apply for Correction/Rearrangement of Name",
          },
          {
            id: 2,
            type: "warning",
            title: "NYSC-BDI Loan",
            body: "Don’t miss out. Apply now for the NYSC-BDI Loan — your gateway to business growth.",
            cta: "Apply for NYSC-BDI Loan",
          },
          {
            id: 3,
            type: "info",
            title: "NIYA Gigs",
            body: "NIYA Gigs is here — an initiative of the Federal Ministry of Youth Development designed to connect young Nigerians to verified freelance opportunities nationwide.",
            cta: "Explore Opportunities",
          },
          {
            id: 4,
            type: "info",
            title: "Travel Advisory",
            body: "You are strictly advised not to travel at night. Break your journey once it is 6pm. Ensure you board vehicles from designated parks and not by the roadside.",
            cta: "Safety Guidelines",
          },
          {
            id: 5,
            type: "primary",
            title: "Monthly Clearance",
            body: "You have been scheduled for your monthly clearance. You are expected to be at your LGA on Monday, 09/03/2026 from 12:00 noon to 1:30 pm.",
            cta: "Print Schedule",
          },
        ],
        notifications: [
          {
            id: 1,
            title: "ID card available",
            message: "You can now view and download your corps member ID card.",
            time: "just now",
            read: false,
          },
          {
            id: 2,
            title: "Biometric verification reminder",
            message:
              "Ensure you complete your biometric verification before the next clearance deadline.",
            time: "1h ago",
            read: false,
          },
          {
            id: 3,
            title: "Monthly clearance scheduled",
            message: "Your next LGA clearance is set for Monday, 04/03/2026.",
            time: "2h ago",
            read: false,
          },
          {
            id: 4,
            title: "PPA assignment confirmed",
            message:
              "Your Place of Primary Assignment (PPA) has been approved. Please report immediately.",
            time: "5d ago",
            read: false,
          },
        ],
        sidebar: [
          "My Dashboard",
          "Change Password",
          "Course Correction",
          "PPA Letter",
          "LGA Clearance",
          "Disciplinary Case",
          "SAED Registration",
          "Logout",
        ],
      });
    }, 700);
  });
}

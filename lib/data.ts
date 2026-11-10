export const person = {
  name: "Muhammed Abdulla K",
  role: "Cloud & DevOps Engineer in training",
  city: "Vadakara, Kerala",
  email: "muhammedabdullakofficial@gmail.com",
  linkedin: "https://linkedin.com/in/muhammedabdullakofficial",
  bio: "ECE graduate moving into Cloud and DevOps, building on embedded systems, IoT and hardware validation. I automate builds and deployments with Jenkins, GitHub Actions and AWS EC2.",
};

export const heroStats = [
  { value: "3", label: "Projects built" },
  { value: "4", label: "Languages spoken" },
  { value: "97.8%", label: "Secondary school score" },
];

export const workStats = [
  { value: "3", label: "Sensors on the health monitor" },
  { value: "2", label: "Jenkins agent connection methods" },
  { value: "1", label: "LiDAR robot running SLAM" },
];

export type Project = {
  year: string; title: string; bullets: string[]; tech: string[];
  links?: { live?: string; code?: string };
};

// Add real URLs under `links` and the disabled buttons become live links.
export const projects: Project[] = [
  {
    year: "2026",
    title: "Jenkins CI/CD Build & Deployment Automation",
    bullets: [
      "Connected separate AWS EC2 instances to Jenkins as nodes/agents for build and deployment tasks.",
      "Practised both inbound (direct) and SSH-based agent connection methods.",
      "Configured a webhook to trigger project builds automatically after repository updates.",
    ],
    tech: ["Jenkins", "AWS EC2", "GitHub", "Webhooks", "SSH", "Linux"],
  },
  {
    year: "2026",
    title: "ROS-Based Autonomous Mobile Robot Navigation",
    bullets: [
      "Developed a Raspberry Pi-based mobile robot that navigates autonomously in unstructured environments.",
      "Integrated a LiDAR sensor for real-time scanning, obstacle detection and 2D map generation.",
      "Implemented SLAM and path-planning algorithms using the ROS framework.",
      "Validated behaviour through iterative hardware-software testing and sensor calibration.",
    ],
    tech: ["Raspberry Pi", "ROS", "Python", "LiDAR", "SLAM", "GPIO"],
  },
  {
    year: "2025",
    title: "IoT-Based Health Monitoring System",
    bullets: [
      "Designed a real-time health monitoring device using an ESP32 and biomedical sensors.",
      "Interfaced temperature (DS18B20), pulse (MAX30100) and ECG sensors over I2C/UART.",
      "Wrote Embedded C firmware to process sensor data, drive an LCD and send readings over Wi-Fi.",
      "Built a threshold-based alert that flags abnormal physiological readings in real time.",
    ],
    tech: ["ESP32", "Embedded C", "I2C", "UART", "Wi-Fi", "LCD", "Biomedical sensors"],
  },
];

export const tools = [
  "AWS EC2", "Linux", "Git", "GitHub", "GitHub Actions", "GitHub Secrets", "Jenkins", "Webhooks", "SSH", "Bash", "Cron",
  "Docker", "Kubernetes", "Terraform", "Ansible", "Prometheus", "Grafana", "C", "C++", "Python", "Embedded C", "MATLAB",
  "ESP32", "Arduino", "Raspberry Pi", "8051", "ROS", "LiDAR", "SLAM", "UART", "I2C", "SPI", "Wi-Fi", "GPIO",
  "DS18B20", "MAX30100", "PCB assembly", "Soldering", "Oscilloscope", "Function generator", "Multimeter", "Power supply",
  "LAN", "Routers & switches",
];

export const record = [
  { when: "Sep 2026 – now", title: "DevOps Engineering with AI", where: "Zoople Technologies, Kozhikode", detail: "Linux administration, AWS EC2, Git, GitHub Actions deployments, Jenkins agents and webhooks. Docker, Kubernetes, Terraform and Ansible in the syllabus." },
  { when: "2022 – 2026", title: "B.Tech, Electronics and Communication Engineering", where: "College of Engineering Vadakara, APJ Abdul Kalam Technological University", detail: "CGPA 6.37/10." },
  { when: "2025", title: "Technical seminar: NeoCommLight", where: "Visible Light Communication for RF-restricted NICUs", detail: "Presented VLC as a safer alternative to RF wireless systems in neonatal ICUs." },
  { when: "2025", title: "Intern", where: "All India Radio (Akashavani), Kozhikode", detail: "Traced signal flow across FM and AM transmission, from studio input to antenna output." },
  { when: "2020 – 2022", title: "Higher Secondary Education", where: "MIM Higher Secondary School, Perode", detail: "80.2%." },
  { when: "2017 – 2020", title: "Secondary School Education", where: "MIM Higher Secondary School, Perode", detail: "97.8%." },
];

export const skillGroups = [
  { title: "Cloud & DevOps", items: ["AWS EC2", "Linux administration", "Git and GitHub", "Jenkins", "GitHub Actions", "Bash", "Cron"] },
  { title: "Learning now", items: ["Docker", "Kubernetes", "Terraform", "Ansible", "Prometheus", "Grafana"] },
  { title: "Programming", items: ["C", "C++", "Python", "Embedded C", "MATLAB", "Bash (basics)"] },
  { title: "Embedded systems", items: ["ESP32", "Arduino", "Raspberry Pi", "8051", "UART", "I2C", "SPI", "Wi-Fi", "GPIO"] },
  { title: "Hardware", items: ["PCB assembly & soldering", "Breadboard prototyping", "Circuit debugging", "Component identification"] },
  { title: "Lab instruments", items: ["Oscilloscope (DSO/CRO)", "Function generator", "Digital multimeter", "Regulated power supply"] },
  { title: "Networking", items: ["LAN setup", "Router & switch basics"] },
];

export const principles = [
  { title: "Automate what repeats", text: "Cron jobs, GitHub Actions and Jenkins webhooks mean a push does the work for me." },
  { title: "Test on real hardware", text: "I validated the robot through iterative hardware-software testing and sensor calibration." },
  { title: "Trace the whole chain", text: "At All India Radio I followed the signal from studio input to antenna output." },
  { title: "Debug with evidence", text: "Circuit fault-finding and SSH authentication errors taught me to check each link before guessing." },
];

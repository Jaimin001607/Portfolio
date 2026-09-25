// All site content lives here. To add a project: copy one object in PROJECTS,
// drop its images in assets/img/, and it shows up on the home page + gets its own page.

const PROFILE = {
  name: "Jaimin Suthar",
  role: "Mechanical Engineer",
  tagline: "I'm a mechanical engineer who brings hardware, software and electronics together to build machines that sense, think and move.",
  school: "B.S. Mechanical Engineering, Minor in Computer Science · CSU Long Beach · Dec 2026",
  gpa: "3.57",
  email: "jaiminsuthar390@gmail.com",
  linkedin: "https://www.linkedin.com/in/jaimin-suthar-251278222",
  resume: "assets/Jaimin_Suthar_Resume.pdf",
  stats: [
    { value: "B.S. ME", label: "Mechanical Engineering + Computer Science minor" },
    { value: "2+ yrs", label: "R&D research with sensors & hardware" },
    { value: "25", label: "engineers led at Beach Aerial Division" },
    { value: "3.57", label: "GPA, B.S. Mechanical Eng." },
  ],
};

const CATEGORIES = ["All", "CAD / Mechanical", "FEA & Optimization", "UAV & Autonomy", "Computer Vision", "Simulation"];

const PROJECTS = [
  {
    id: "autonomous-quadcopter",
    title: "Autonomous Quadcopter",
    org: "Beach Aerial Division",
    dates: "Jan 2026 – Aug 2026",
    kind: "Commercial Product",
    categories: ["UAV & Autonomy", "CAD / Mechanical"],
    summary: "Beach Aerial Division commercial product: an autonomous quadcopter that finds a ground target with onboard vision and flies a multi-checkpoint payload mission.",
    cover: { video: "assets/video/quad-flight.mp4", poster: "assets/img/quad-flight-poster.jpg" },
    tools: ["SolidWorks", "Pixhawk", "Jetson Nano", "Python", "OpenCV", "YOLO"],
    results: [
      { value: "Autonomous", label: "target-to-drop mission" },
      { value: "Jetson + Pixhawk", label: "vision + flight control" },
    ],
    problem: "Develop a commercial-grade quadcopter for the division's product line that can take off, find a marked target, deliver a payload, and hit multiple checkpoints on its own, within tight limits on size, weight and cost.",
    role: "UAV Engineering Head. I led the airframe design and the integration of the flight controller, onboard computer, power and sensors, and ran the design–test–fly cycles.",
    sections: [
      {
        heading: "Airframe CAD",
        text: "The frame is laminated plywood arms with cross-braces and a stacked center plate that holds the battery and electronics. I modeled it fully in SolidWorks first so motor spacing, prop clearance and the battery bay were fixed before cutting anything.",
        media: [{ src: "assets/img/quad-cad.jpg", caption: "Full SolidWorks assembly: braced arms, stacked center plates, underslung battery bay" }],
      },
      {
        heading: "Build & integration",
        text: "I integrated the Pixhawk flight controller, NVIDIA Jetson Nano, RC receiver, ESCs, power distribution and sensor wiring, and added the PVC landing gear with the payload mechanism described in its own project.",
        media: [{ src: "assets/img/quad-build.jpg", caption: "Built airframe with flight electronics and landing gear, ready for field testing" }],
      },
      {
        heading: "Flight testing",
        text: "We flew test after test and fixed what each flight showed: tuning, wiring, mounting. The competition run needed a stable hover directly over the target so the payload could be released.",
        media: [
          { video: "assets/video/quad-flight.mp4", poster: "assets/img/quad-flight-poster.jpg", caption: "Campus flight test: takeoff and hover" },
          { src: "assets/img/quad-competition.jpg", caption: "Competition run: UAV holding position over the ground target" },
        ],
      },
    ],
  },
  {
    id: "payload-claw",
    title: "Payload Claw & Landing Gear",
    org: "Beach Aerial Division",
    dates: "2026",
    kind: "Student Team",
    categories: ["CAD / Mechanical", "FEA & Optimization"],
    summary: "A servo-driven gripper and landing-gear assembly, checked with static FEA and lightened with topology optimization.",
    cover: { src: "assets/img/claw-exploded.jpg", fit: "contain" },
    tools: ["SolidWorks", "SolidWorks Simulation", "Topology Study", "PETG-CF 3D printing"],
    results: [
      { value: "0.059 mm", label: "max static displacement" },
      { value: "25 kg", label: "servo, Pixhawk-controlled" },
    ],
    problem: "The drone needed landing gear that could take landing loads and a claw that could hold and release a payload when the flight controller commanded it, while staying light and cheap to build.",
    role: "I designed the mechanism and the frame, ran the FEA and the topology study, and designed the printed parts for toleranced, printable assembly.",
    sections: [
      {
        heading: "Design breakdown",
        text: "Balsa top plate for mounting. A 3D-printed PETG-CF servo and gear drive (25 kg servo, commanded by the Pixhawk) that moves a toleranced claw with multiple contact points. Legs are 1-inch PVC with T-joint feet to widen the footprint for stability.",
        media: [
          { src: "assets/img/claw-exploded.jpg", caption: "Labeled assembly: materials and function of each subsystem" },
          { src: "assets/img/claw-cad.jpg", caption: "SolidWorks assembly with claw and gear train" },
        ],
      },
      {
        heading: "Static FEA",
        text: "I ran a static study on the full legs + claw assembly under landing and payload load. Peak displacement was about 0.059 mm, at the top-plate corners, and the load path through the legs stayed well within limits.",
        media: [{ src: "assets/img/claw-fea.jpg", caption: "SolidWorks Simulation: resultant displacement (URES), max 5.9e-02 mm" }],
      },
      {
        heading: "Topology optimization",
        text: "I ran a topology study on the mounting bracket to remove material that wasn't carrying load, then redesigned it as a printable part.",
        media: [{ src: "assets/img/topology.jpg", caption: "(A) Baseline bracket under load → (B) topology study → (C) optimized bracket" }],
      },
    ],
  },
  {
    id: "computer-vision",
    title: "Vision-Guided Target Detection",
    org: "Beach Aerial Division",
    dates: "2026",
    kind: "Student Team",
    categories: ["Computer Vision", "UAV & Autonomy"],
    summary: "Real-time target detection on a Jetson, feeding position offsets back to the flight controller for precise hover and drop.",
    cover: { video: "assets/video/cv-detect.mp4", poster: "assets/img/cv-detect-poster.jpg" },
    tools: ["Python", "OpenCV", "YOLO", "NVIDIA Jetson", "Pixhawk"],
    results: [
      { value: "~27 FPS", label: "live detection on Jetson" },
      { value: "Closed loop", label: "offset → navigation feedback" },
    ],
    problem: "GPS alone isn't accurate enough to put a payload on a target. The drone had to see the marker itself and correct its position.",
    role: "I built the vision pipeline in Python/OpenCV with a YOLO-based detector, and connected its output (the target's offset from the image center) to the drone's navigation.",
    sections: [
      {
        heading: "Detection in the air",
        text: "The downward camera finds the X marker, draws its bounding box, and computes the dx/dy offset from the image center. The drone uses that offset to center itself before the drop.",
        media: [
          { video: "assets/video/cv-detect.mp4", poster: "assets/img/cv-detect-poster.jpg", caption: "Onboard camera view: marker detection and centering" },
          { src: "assets/img/cv-overhead.jpg", caption: "Detection frame with confidence score and aim reticle" },
        ],
      },
      {
        heading: "Bench testing on the Jetson",
        text: "I tuned the model and pipeline on the bench first, confirming frame rate and confidence on the Jetson itself before flying.",
        media: [{ src: "assets/img/cv-jetson.jpg", caption: "Detector running on the Jetson in the lab: ~26.8 FPS, 0.84 confidence" }],
      },
    ],
  },
  {
    id: "brake-caliper",
    title: "FSAE Brake Caliper",
    org: "CSULB Formula SAE",
    dates: "Jan 2024 – Feb 2025",
    kind: "Student Team",
    categories: ["CAD / Mechanical", "FEA & Optimization"],
    summary: "Brake caliper taken from detailed CAD through FEA, supplier CNC machining, in-house rework and installation on the car.",
    cover: { src: "assets/img/brake-caliper-render.jpg" },
    tools: ["SolidWorks", "ANSYS", "Thermal FEA", "DFM", "CNC machining"],
    results: [
      { value: "+14%", label: "braking performance" },
      { value: "+28%", label: "heat dissipation" },
    ],
    problem: "The caliper has to clamp hard, stop after stop, without flexing or overheating. It also has to be light enough for a race car and practical to CNC machine.",
    role: "I owned the caliper from CAD to the car: detailed design, structural and thermal analysis, preparing the design for the CNC supplier, fixing parts in-house, and installing and testing on the vehicle.",
    sections: [
      {
        heading: "Detailed CAD",
        text: "I modeled the full caliper assembly in SolidWorks: a two-piece body, pads, pad-retention pins, spring clip and bleed fitting. I iterated the geometry heavily, adding stiffness where clamp loads flow, removing mass where they don't, and adding features that help the caliper shed heat. Every feature was designed to be machinable.",
        media: [{ src: "assets/img/brake-caliper-render.jpg", caption: "Caliper assembly: body, pads, retention hardware, bleed fitting" }],
      },
      {
        heading: "Structural & thermal analysis",
        text: "Once the CAD model was complete, I ran structural FEA under clamp and braking loads to check stress and deflection, and thermal analysis under repeated hard stops to see how heat built up and moved out of the caliper. The results fed directly into the next design iteration. Testing confirmed a 14% gain in braking performance and 28% better heat dissipation.",
        media: [],
      },
      {
        heading: "Manufacturing: supplier CNC + in-house fixes",
        text: "The final design went to an outside supplier for CNC machining. When the parts came back, we inspected them and corrected the fit and finish issues ourselves in our own shop, so the calipers were ready to assemble without waiting on another supplier run.",
        media: [],
      },
      {
        heading: "Installed & tested on the car",
        text: "The finished calipers were installed on the team's vehicle, and we checked that they clamped consistently, released cleanly and held up to heat over repeated braking.",
        media: [{ src: "assets/img/caliper-car-install.jpg", caption: "Team vehicle frame the calipers were installed on" }],
      },
    ],
  },
  {
    id: "sensor-housing",
    title: "IMU Sensing & Gait Simulation",
    org: "HPRL Lab · CSULB",
    dates: "Mar 2025 – Jan 2026",
    kind: "Research",
    categories: ["CAD / Mechanical", "Simulation"],
    summary: "Custom IMU housings plus a MuJoCo/MyoSuite pipeline that syncs 32 IMUs and plays back human gait on a musculoskeletal model.",
    cover: { src: "assets/img/sensor-housing.jpg", fit: "contain" },
    tools: ["SolidWorks", "MuJoCo", "MyoSuite", "OpenSim", "Python", "3D printing"],
    results: [
      { value: "32 IMUs", label: "synchronized at the same time" },
      { value: "Smoother", label: "gait playback than our Unity setup" },
    ],
    problem: "Wearable IMUs have to stay in a fixed orientation on the body, and their data only matters once it drives a realistic body model. Our earlier Unity visualization was slow and jittery.",
    role: "I designed the sensor enclosures and built the full simulation pipeline in MuJoCo/MyoSuite, from raw gait data to physically believable playback. Research advised by Emel Demircan.",
    sections: [
      {
        heading: "Enclosure design",
        text: "Two-part shell held by four screws, a recessed USB-C opening, and flanges with slots so it can be mounted with some adjustment. I tuned the geometry for printability and cable routing, and did tolerance analysis so every sensor sits in the same position.",
        media: [{ src: "assets/img/sensor-housing.jpg", caption: "Isometric, front and top views of the enclosure" }],
      },
      {
        heading: "Gait simulation in MuJoCo",
        text: "The pipeline reads OpenSim inverse-kinematics (.mot) gait data, extracts and filters the joint trajectories (position and velocity), and maps hip, knee and ankle motion onto the MyoSuite MyoLeg musculoskeletal model. It plays back a smooth, looping gait cycle for consistent visualization.",
        media: [{ src: "assets/img/myosuite-gait.jpg", caption: "MyoSuite musculoskeletal model running in MuJoCo" }],
      },
      {
        heading: "Making the motion physically meaningful",
        text: "Much of the work was removing artifacts such as joint drift and dangling limbs by correcting joint mappings and offsets, tuning the filtering, and stabilizing the root/pelvis. The finished pipeline synchronizes 32 IMUs at the same time, runs faster than our previous workflow, and produces smoother locomotion than the Unity-based setup it replaced.",
        media: [],
      },
    ],
  },
  {
    id: "fixed-wing-uav",
    title: "3D-Printed Fixed-Wing UAV",
    org: "Beach Aerial Division",
    dates: "2026",
    kind: "Commercial Product",
    categories: ["UAV & Autonomy", "CAD / Mechanical"],
    summary: "Beach Aerial Division commercial product: a 3D-printed ASA airframe designed around its payload, electronics and airflow, iterated using ANSYS.",
    cover: { src: "assets/img/fixedwing-launch.jpg" },
    tools: ["SolidWorks", "ANSYS Fluent", "ASA 3D printing", "Pixhawk"],
    results: [
      { value: "ASA", label: "printed airframe" },
      { value: "ANSYS", label: "airflow + thermal iteration" },
    ],
    problem: "Develop a commercial fixed-wing platform for the division: an airframe that can be fully 3D-printed but still carries a thermal camera, flight electronics and a battery with good aerodynamics and cooling.",
    role: "I designed the airframe structure and printed interfaces, ran airflow and thermal analysis, and changed the geometry based on the results.",
    sections: [
      {
        heading: "Built and hand-launched",
        text: "The printed ASA airframe has the electronics and payload built into the fuselage, with a pusher prop behind a V-tail.",
        media: [{ src: "assets/img/fixedwing-launch.jpg", caption: "Printed airframe ready for hand launch" }],
      },
    ],
  },
];

const EXPERIENCE = [
  {
    company: "HyAxiom (Doosan)",
    role: "Reliability Engineering Intern",
    dates: "May 2026 – Aug 2026",
    points: [
      "Led reliability and durability testing of pneumatic control valves and balance-of-plant components for PEM water electrolysis systems, and set performance benchmarks, operating limits and pass/fail criteria.",
      "Built a vibration-based condition-monitoring and prognostic health approach using historian data, RMS analytics and sensor diagnostics.",
      "Ran root-cause investigations on vibrating components and worked with the controls and instrumentation teams to add health-monitoring sensors.",
    ],
    tags: ["LabVIEW", "MATLAB", "Python", "RMS vibration", "DAQ"],
  },
  {
    company: "Beach Aerial Division · CSULB",
    role: "UAV Engineering Head",
    dates: "Oct 2025 – Present",
    points: [
      "Lead a team of 25 engineers across several UAV platforms.",
      "Designed and built a vision-assisted autonomous quadcopter with a payload mechanism.",
      "Integrated the flight controllers, Jetson compute, power distribution and sensors.",
    ],
    tags: ["Pixhawk", "Jetson", "OpenCV", "SolidWorks"],
  },
  {
    company: "California State University, Long Beach",
    role: "Research Engineer",
    dates: "Dec 2024 – Jan 2026",
    points: [
      "Led a small team designing and 3D-printing IMU sensor housings for wearables, focused on fit and durability.",
      "Built a MuJoCo/MyoSuite gait-simulation pipeline that syncs 32 IMUs and maps OpenSim gait data onto a musculoskeletal leg model, with smoother playback than the earlier Unity setup.",
      "Coordinated the mechanical, electrical and materials sub-teams on a self-powered wearable using triboelectric nanogenerators (TENGs).",
      "Mentored teammates on CAD, design validation and FEA-driven decisions.",
    ],
    tags: ["SolidWorks", "Additive mfg.", "Wearables"],
  },
  {
    company: "Beach Launch Team · CSULB",
    role: "Rocket Component Designer → Avionics Engineering Head",
    dates: "Nov 2022 – Jan 2026",
    points: [
      "Designed and fabricated flight-critical structural components from concept through assembly and physical testing.",
      "Used structural FEA and material selection to improve structural strength by 34%.",
      "Led avionics hardware integration with the propulsion, structures and recovery teams.",
    ],
    tags: ["SolidWorks", "ANSYS", "FEA", "Altium"],
  },
];

const SKILLS = [
  { group: "CAD & Design", items: ["SolidWorks", "CATIA", "AutoCAD", "Assemblies & drawings", "GD&T", "Tolerance stack-up"] },
  { group: "Analysis", items: ["FEA (ANSYS, Abaqus)", "SolidWorks Simulation", "Topology optimization", "Thermal & CFD (Fluent, COMSOL)", "MuJoCo / MyoSuite", "OpenSim"] },
  { group: "Manufacturing", items: ["DFM / DFA", "3D printing (PETG-CF, ASA)", "Composites", "Machining-ready design", "Material selection"] },
  { group: "Test & Data", items: ["LabVIEW", "DAQ & instrumentation", "Durability / cycle testing", "RMS vibration analysis", "Root-cause analysis"] },
  { group: "Code & Systems", items: ["Python", "MATLAB", "C++", "OpenCV / YOLO", "Pixhawk", "Jetson"] },
];

// Images shown in the CAD & Analysis gallery (click opens a lightbox, links to the project).
const GALLERY = [
  { src: "assets/img/brake-caliper-render.jpg", caption: "FSAE brake caliper assembly", project: "brake-caliper", wide: true },
  { src: "assets/img/claw-exploded.jpg", caption: "Payload claw: labeled assembly", project: "payload-claw", wide: true },
  { src: "assets/img/claw-fea.jpg", caption: "Static FEA: resultant displacement", project: "payload-claw" },
  { src: "assets/img/topology.jpg", caption: "Topology optimization: baseline → study → optimized", project: "payload-claw", long: true },
  { src: "assets/img/quad-cad.jpg", caption: "Quadcopter airframe CAD", project: "autonomous-quadcopter", long: true },
  { src: "assets/img/sensor-housing.jpg", caption: "IMU sensor housing: 3 views", project: "sensor-housing", tall: true },
  { src: "assets/img/claw-cad.jpg", caption: "Landing gear + claw assembly", project: "payload-claw" },
];

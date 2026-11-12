// Local, source-linked mission content for the Missions page.
// Keep the existing mission IDs and category values stable for the page filters.
window.COSMIC_MISSIONS = [
  {
    id: "apollo-11", title: "Apollo 11", year: "1969", category: "moon", categoryLabel: "Moon mission",
    destinations: [{ id: "moon", label: "Moon" }], imageId: "as11-40-5874",
    imageAlt: "Apollo 11 astronaut Buzz Aldrin standing on the Moon beside the U.S. flag.", imageCredit: "NASA",
    imageSourceUrl: "https://images.nasa.gov/details/as11-40-5874",
    summary: "The first crewed lunar landing brought Neil Armstrong and Buzz Aldrin to the Moon while Michael Collins remained in orbit.",
    details: "Apollo 11 demonstrated that people could travel to the lunar surface, work there, and return safely. The crew also collected lunar samples and deployed scientific experiments.",
    timeline: [
      { id: "launch", date: "1969-07-16", title: "Launch", description: "Apollo 11 launched from Kennedy Space Center with Neil Armstrong, Michael Collins, and Buzz Aldrin aboard.", sourceUrl: "https://www.nasa.gov/history/apollo-11-mission-overview/" },
      { id: "landing", date: "1969-07-20", title: "Lunar landing", description: "The Eagle lunar module landed in the Sea of Tranquility; Armstrong and Aldrin later walked on the Moon.", sourceUrl: "https://www.nasa.gov/history/apollo-11-mission-overview/" },
      { id: "return", date: "1969-07-24", title: "Return to Earth", description: "The command module Columbia splashed down in the Pacific Ocean, ending the mission.", sourceUrl: "https://www.nasa.gov/history/apollo-11-mission-overview/" }
    ],
    hardware: [
      { id: "eagle-descent", name: "Eagle descent stage", status: "left-behind", description: "The descent stage remained at the lunar landing site after the ascent stage lifted off.", sourceUrl: "https://www.nasa.gov/history/apollo-11-mission-overview/" },
      { id: "laser-reflector", name: "Laser ranging retroreflector", status: "left-behind", description: "The Apollo 11 crew deployed this reflector on the lunar surface for laser ranging experiments.", sourceUrl: "https://ntrs.nasa.gov/api/citations/19750024076/downloads/19750024076.pdf" },
      { id: "command-module", name: "Command module Columbia", status: "returned", description: "The crew returned to Earth in Columbia, which was recovered after splashdown.", sourceUrl: "https://www.nasa.gov/history/apollo-11-mission-overview/" }
    ],
    scientificImpact: [{ id: "lunar-samples", title: "Lunar samples and experiments", description: "The astronauts collected lunar material and deployed the Early Apollo Scientific Experiments Package, enabling study of the Moon both on-site and in laboratories on Earth.", sourceUrl: "https://www.nasa.gov/history/apollo-11-mission-overview/" }],
    whyItMatters: "Apollo 11 was the first crewed landing on the Moon and showed that a human lunar expedition could be completed from launch through recovery.", whyItMattersSourceUrl: "https://www.nasa.gov/history/apollo-11-mission-overview/",
    debrief: { questionId: "apollo-purpose", difficulty: "Easy", question: "Which Apollo 11 spacecraft carried Armstrong and Aldrin down to the lunar surface?", answers: [{ id: "a", text: "Eagle, the lunar module" }, { id: "b", text: "Columbia, the command module" }, { id: "c", text: "Saturn V's first stage" }, { id: "d", text: "The recovery helicopter" }], correctAnswerId: "a", explanation: "Eagle was the lunar module. Columbia stayed in lunar orbit with Michael Collins aboard.", sourceUrl: "https://www.nasa.gov/history/apollo-11-mission-overview/" }
  },
  {
    id: "artemis-i", title: "Artemis I", year: "2022", category: "moon", categoryLabel: "Moon mission",
    destinations: [{ id: "moon", label: "Moon" }], imageId: "KSC-20210710-PH-ILW01_0097",
    imageAlt: "The Orion spacecraft for Artemis I being moved at Kennedy Space Center.", imageCredit: "NASA",
    imageSourceUrl: "https://images.nasa.gov/album/Artemis_I_Orion_Move_to_LASF",
    summary: "An uncrewed flight test sent Orion around the Moon and back to test systems for future crewed exploration.",
    details: "Artemis I tested the integrated Space Launch System rocket, Orion spacecraft, and supporting ground systems on an uncrewed lunar flight.",
    timeline: [
      { id: "launch", date: "2022-11-16", title: "Launch", description: "The Space Launch System launched Orion from Kennedy Space Center.", sourceUrl: "https://www.nasa.gov/mission/artemis-i/" },
      { id: "farpoint", date: "2022-11-28", title: "Farthest distance from Earth", description: "Orion reached 268,563 miles from Earth during the mission.", sourceUrl: "https://www.nasa.gov/reference/artemis-i-mission-timeline/" },
      { id: "splashdown", date: "2022-12-11", title: "Splashdown", description: "Orion completed a parachute-assisted splashdown in the Pacific Ocean and was recovered.", sourceUrl: "https://www.nasa.gov/mission/artemis-i/" }
    ],
    hardware: [
      { id: "orion", name: "Orion crew module", status: "returned", description: "The uncrewed Orion spacecraft returned to Earth and was recovered after splashdown.", sourceUrl: "https://www.nasa.gov/mission/artemis-i/" },
    ],
    scientificImpact: [{ id: "flight-test", title: "Deep-space flight test", description: "The flight gathered engineering data on Orion and the launch and recovery systems to inform future crewed missions.", sourceUrl: "https://www.nasa.gov/mission/artemis-i/" }],
    whyItMatters: "Artemis I validated key systems for NASA's planned human missions to the Moon.", whyItMattersSourceUrl: "https://www.nasa.gov/mission/artemis-i/",
    debrief: { questionId: "artemis-purpose", difficulty: "Easy", question: "Was Artemis I crewed or uncrewed?", answers: [{ id: "a", text: "Uncrewed; it was a flight test" }, { id: "b", text: "Crewed by two astronauts" }, { id: "c", text: "Crewed by six astronauts" }, { id: "d", text: "It stayed on the launch pad" }], correctAnswerId: "a", explanation: "Artemis I was an uncrewed test flight of SLS, Orion, and supporting ground systems.", sourceUrl: "https://www.nasa.gov/mission/artemis-i/" }
  },
  {
    id: "curiosity", title: "Curiosity", year: "2011", category: "mars", categoryLabel: "Mars mission",
    destinations: [{ id: "mars", label: "Mars" }], imageId: "PIA22210",
    imageAlt: "Panorama of Gale Crater on Mars captured by NASA's Curiosity rover.", imageCredit: "NASA/JPL-Caltech/MSSS",
    imageSourceUrl: "https://images.nasa.gov/details/PIA22210",
    summary: "This mobile laboratory studies Gale Crater to learn whether ancient Mars had environments that could support microbial life.",
    details: "Curiosity is part of the Mars Science Laboratory mission. Its instruments analyze rocks, soil, and the atmosphere as it explores Gale Crater and Mount Sharp.",
    timeline: [
      { id: "launch", date: "2011-11-26", title: "Launch", description: "The Mars Science Laboratory mission launched from Cape Canaveral.", sourceUrl: "https://www.jpl.nasa.gov/missions/mars-science-laboratory-curiosity-rover-msl/" },
      { id: "landing", date: "2012-08-06", title: "Landing in Gale Crater", description: "Curiosity landed in Gale Crater using a parachute and a rocket-powered sky crane descent system.", sourceUrl: "https://www.jpl.nasa.gov/missions/mars-science-laboratory-curiosity-rover-msl/" }
    ],
    hardware: [
      { id: "rover", name: "Curiosity rover", status: "operational", description: "The rover remains an active Mars science mission; its instruments study the planet in place.", sourceUrl: "https://science.nasa.gov/mission/msl-curiosity/" },
      { id: "skycrane", name: "Sky crane descent stage", status: "left-behind", description: "The powered descent system lowered the rover to the surface and separated after touchdown; it was not returned to Earth.", sourceUrl: "https://www.jpl.nasa.gov/missions/mars-science-laboratory-curiosity-rover-msl/" }
    ],
    scientificImpact: [{ id: "ancient-habitable", title: "Evidence of ancient habitable environments", description: "Rocks and sediments studied in Gale Crater record ancient lake environments that could have supported microbial life.", sourceUrl: "https://ares.jsc.nasa.gov/missions/msl/important-discoveries.cfm" }],
    whyItMatters: "Curiosity helps scientists investigate how Mars' environments changed and whether the planet once had conditions suitable for life.", whyItMattersSourceUrl: "https://science.nasa.gov/mission/msl-curiosity/",
    debrief: { questionId: "curiosity-goal", difficulty: "Medium", question: "What is a central science question Curiosity investigates?", answers: [{ id: "a", text: "Whether ancient Mars had habitable environments" }, { id: "b", text: "Whether Mars has oceans today" }, { id: "c", text: "How to land people on Venus" }, { id: "d", text: "Whether Saturn has a solid surface" }], correctAnswerId: "a", explanation: "Curiosity studies past environments and whether they could have supported microbial life.", sourceUrl: "https://science.nasa.gov/mission/msl-curiosity/" }
  },
  {
    id: "perseverance", title: "Perseverance", year: "2020", category: "mars", categoryLabel: "Mars mission",
    destinations: [{ id: "mars", label: "Mars" }], imageId: "PIA24430",
    imageUrl: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/p/i/a/PIA24430_Perseverance_First_Color_View.jpg",
    imageAlt: "Perseverance's first full-color view of the Martian surface from its landing site.", imageCredit: "NASA/JPL-Caltech",
    imageSourceUrl: "https://science.nasa.gov/resource/perseverances-first-full-color-look-at-mars/",
    summary: "Perseverance explores Jezero Crater, searches for signs of ancient life, and collects rock and regolith samples.",
    details: "The Mars 2020 rover mission landed in Jezero Crater, a site with evidence of an ancient river delta. It studies geology and climate and caches samples for possible future return.",
    timeline: [
      { id: "launch", date: "2020-07-30", title: "Launch", description: "The Mars 2020 mission launched from Cape Canaveral, Florida.", sourceUrl: "https://science.nasa.gov/mission/mars-2020-perseverance/" },
      { id: "landing", date: "2021-02-18", title: "Landing in Jezero Crater", description: "Perseverance landed in Jezero Crater, an area that includes an ancient delta.", sourceUrl: "https://science.nasa.gov/mission/mars-2020-perseverance/" },
      { id: "first-samples", date: "2021-09-06", title: "First successful sample collection", description: "The rover collected its first two rock core samples at the Citadelle location.", sourceUrl: "https://science.nasa.gov/resource/perseverances-journey-to-first-successful-sample-collection/" }
    ],
    hardware: [
      { id: "rover", name: "Perseverance rover", status: "operational", description: "The active rover studies Jezero Crater and collects rock and regolith samples.", sourceUrl: "https://science.nasa.gov/mission/mars-2020-perseverance/" },
      { id: "sample-tubes", name: "Sealed sample tubes", status: "left-behind", description: "The rover caches selected samples on Mars for possible collection by a future mission; they have not been returned to Earth.", sourceUrl: "https://science.nasa.gov/mission/mars-2020-perseverance/mars-rock-samples/" },
      { id: "ingenuity", name: "Ingenuity Mars Helicopter", status: "left-behind", description: "The technology demonstrator completed its flight mission on Mars and remains there; NASA reported the end of its flight mission in 2024.", sourceUrl: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/" }
    ],
    scientificImpact: [{ id: "sample-science", title: "Samples for future study", description: "Perseverance is collecting and caching rock and regolith so scientists may examine selected samples in Earth laboratories in the future.", sourceUrl: "https://science.nasa.gov/mission/mars-2020-perseverance/" }],
    whyItMatters: "The mission combines the search for past habitability with sample collection and technology demonstrations for future exploration.", whyItMattersSourceUrl: "https://science.nasa.gov/mission/mars-2020-perseverance/",
    debrief: { questionId: "perseverance-goal", difficulty: "Medium", question: "Why is Perseverance caching rock samples on Mars?", answers: [{ id: "a", text: "They may be collected by a future mission for study on Earth" }, { id: "b", text: "To build a rover garage" }, { id: "c", text: "To make Mars' atmosphere thicker" }, { id: "d", text: "To send them to the Moon" }], correctAnswerId: "a", explanation: "The samples are being cached for possible pickup and return to Earth by a future mission.", sourceUrl: "https://science.nasa.gov/mission/mars-2020-perseverance/" }
  },
  {
    id: "voyager-1", title: "Voyager 1", year: "1977", category: "deep-space", categoryLabel: "Deep space",
    destinations: [{ id: "deep-space", label: "Interstellar space" }], imageId: "PIA23645",
    imageAlt: "Earth appears as a tiny pale blue point in Voyager 1's distant view of the solar system.", imageCredit: "NASA/JPL-Caltech",
    imageSourceUrl: "https://science.nasa.gov/resource/voyager-pale-blue-dot-download/",
    summary: "After exploring Jupiter and Saturn, Voyager 1 continued outward and entered interstellar space.",
    details: "Voyager 1 launched in 1977. It explored Jupiter and Saturn before traveling beyond the heliosphere; it continues to send science data from interstellar space.",
    timeline: [
      { id: "launch", date: "1977-09-05", title: "Launch", description: "Voyager 1 launched from Cape Canaveral on a tour of the outer planets.", sourceUrl: "https://science.nasa.gov/mission/voyager/voyager-1/" },
      { id: "jupiter", date: "1979-03-05", title: "Jupiter flyby", description: "Voyager 1 made its closest approach to Jupiter and returned observations of the planet and its system.", sourceUrl: "https://science.nasa.gov/mission/voyager/voyager-1/" },
      { id: "interstellar", date: "2012-08-25", title: "Entered interstellar space", description: "Voyager 1 crossed the heliopause and began measuring the interstellar environment.", sourceUrl: "https://science.nasa.gov/mission/voyager/voyager-1/" }
    ],
    hardware: [
      { id: "spacecraft", name: "Voyager 1 spacecraft", status: "operational", description: "The spacecraft continues communicating with Earth and returning data from its remaining operating instruments.", sourceUrl: "https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/" },
    ],
    scientificImpact: [{ id: "heliosphere", title: "A view beyond the heliosphere", description: "Voyager 1 provides direct measurements of the interstellar environment beyond the Sun's heliosphere.", sourceUrl: "https://science.nasa.gov/mission/voyager/voyager-1/" }],
    whyItMatters: "Voyager 1 is humanity's first spacecraft to operate in interstellar space, extending exploration beyond the Sun's protective bubble.", whyItMattersSourceUrl: "https://science.nasa.gov/mission/voyager/voyager-1/",
    debrief: { questionId: "voyager-boundary", difficulty: "Hard", question: "What boundary did Voyager 1 cross before beginning measurements of interstellar space?", answers: [{ id: "a", text: "The heliopause" }, { id: "b", text: "The asteroid belt" }, { id: "c", text: "Earth's atmosphere" }, { id: "d", text: "The Moon's orbit" }], correctAnswerId: "a", explanation: "Voyager 1 crossed the heliopause, the outer boundary of the Sun's heliosphere.", sourceUrl: "https://science.nasa.gov/mission/voyager/voyager-1/" }
  },
  {
    id: "new-horizons", title: "New Horizons", year: "2006", category: "deep-space", categoryLabel: "Deep space",
    destinations: [{ id: "pluto", label: "Pluto" }, { id: "deep-space", label: "Kuiper Belt" }], imageId: "PIA19952",
    imageAlt: "Enhanced color view of Pluto showing variations across its icy surface, captured by New Horizons.", imageCredit: "NASA/Johns Hopkins University Applied Physics Laboratory/Southwest Research Institute",
    imageSourceUrl: "https://photojournal.jpl.nasa.gov/catalog/PIA19952",
    summary: "The first spacecraft to explore Pluto up close later flew past the Kuiper Belt object Arrokoth.",
    details: "New Horizons flew past Pluto in 2015 and Arrokoth in 2019, returning close-up observations from the distant Kuiper Belt.",
    timeline: [
      { id: "launch", date: "2006-01-19", title: "Launch", description: "New Horizons launched on its journey to Pluto and the Kuiper Belt.", sourceUrl: "https://science.nasa.gov/mission/new-horizons/" },
      { id: "pluto", date: "2015-07-14", title: "Pluto flyby", description: "The spacecraft made the first close flyby of Pluto and its moons.", sourceUrl: "https://science.nasa.gov/mission/new-horizons/" },
      { id: "arrokoth", date: "2019-01-01", title: "Arrokoth flyby", description: "New Horizons flew past Arrokoth, a Kuiper Belt object and the most distant object explored up close at that time.", sourceUrl: "https://science.nasa.gov/mission/new-horizons/" }
    ],
    hardware: [
      { id: "spacecraft", name: "New Horizons spacecraft", status: "operational", description: "NASA lists the mission as active; the spacecraft continued exploring the Kuiper Belt after its planetary flybys.", sourceUrl: "https://science.nasa.gov/mission/new-horizons/" }
    ],
    scientificImpact: [{ id: "pluto-world", title: "A complex world at Pluto", description: "The flyby revealed varied landscapes and geology on Pluto, including a large nitrogen-ice plain described by NASA as Sputnik Planitia.", sourceUrl: "https://science.nasa.gov/mission/new-horizons/" }],
    whyItMatters: "New Horizons expanded close-up exploration from the planets to small icy worlds in the Kuiper Belt.", whyItMattersSourceUrl: "https://science.nasa.gov/mission/new-horizons/",
    debrief: { questionId: "new-horizons-first", difficulty: "Medium", question: "Which world did New Horizons first explore up close?", answers: [{ id: "a", text: "Pluto" }, { id: "b", text: "Mars" }, { id: "c", text: "Europa" }, { id: "d", text: "Venus" }], correctAnswerId: "a", explanation: "New Horizons made the first close flyby of Pluto in July 2015.", sourceUrl: "https://science.nasa.gov/mission/new-horizons/" }
  },
  {
    id: "hubble", title: "Hubble Space Telescope", year: "1990", category: "telescopes", categoryLabel: "Space telescope",
    destinations: [{ id: "earth-orbit", label: "Earth orbit" }], imageId: "0300983",
    imageAlt: "Hubble image of a light echo expanding around the star V838 Monocerotis.", imageCredit: "NASA/ESA/Hubble Heritage Team",
    imageSourceUrl: "https://images.nasa.gov/details/0300983",
    summary: "Hubble observes the universe from Earth orbit and has supported decades of astronomical research.",
    details: "Deployed in 1990, Hubble was designed to be serviced by astronauts in orbit. Five servicing missions upgraded and repaired its systems and instruments.",
    timeline: [
      { id: "deployment", date: "1990-04-25", title: "Deployed in orbit", description: "Space Shuttle Discovery deployed the Hubble Space Telescope in low Earth orbit.", sourceUrl: "https://science.nasa.gov/mission/hubble/observatory/missions-to-hubble/" },
      { id: "servicing", date: "1993-12-02", title: "First servicing mission", description: "Astronauts began the first of five servicing missions to correct and improve the observatory.", sourceUrl: "https://science.nasa.gov/mission/hubble/overview/hubble-timeline/" }
    ],
    hardware: [
      { id: "observatory", name: "Hubble observatory", status: "operational", description: "Hubble remains in Earth orbit and continues scientific observations; NASA reports it remains scientifically productive.", sourceUrl: "https://science.nasa.gov/mission/hubble/overview/faqs/" },
    ],
    scientificImpact: [{ id: "cosmic-expansion", title: "Measuring the universe", description: "Hubble observations have contributed to measuring the expansion of the universe and studying stars, galaxies, and objects in our solar system.", sourceUrl: "https://science.nasa.gov/mission/hubble/overview/hubble-timeline/" }],
    whyItMatters: "Hubble's long-running observations and in-orbit upgrades demonstrate how a space observatory can support generations of research.", whyItMattersSourceUrl: "https://science.nasa.gov/mission/hubble/overview/hubble-timeline/",
    debrief: { questionId: "hubble-service", difficulty: "Medium", question: "What made Hubble unusual among observatories of its era?", answers: [{ id: "a", text: "It was designed for astronaut servicing in orbit" }, { id: "b", text: "It landed on the Moon" }, { id: "c", text: "It returned its mirror to Earth each year" }, { id: "d", text: "It observed only the Sun" }], correctAnswerId: "a", explanation: "Hubble was specifically designed to be serviced by astronauts while in orbit.", sourceUrl: "https://science.nasa.gov/mission/hubble/observatory/missions-to-hubble/" }
  },
  {
    id: "james-webb", title: "James Webb Space Telescope", year: "2021", category: "telescopes", categoryLabel: "Space telescope",
    destinations: [{ id: "sun-earth-l2", label: "Sun–Earth L2 region" }], imageId: "carina_nebula",
    imageAlt: "Webb's infrared view of the Cosmic Cliffs in the Carina Nebula.", imageCredit: "NASA/ESA/CSA/STScI",
    imageSourceUrl: "https://images.nasa.gov/details/carina_nebula",
    summary: "Webb's infrared observatory studies distant galaxies, stars forming in dust, and worlds beyond our solar system.",
    details: "Webb launched in 2021 and traveled to a region near the Sun–Earth L2 point. Its infrared observations help scientists study the early universe and planetary systems.",
    timeline: [
      { id: "launch", date: "2021-12-25", title: "Launch", description: "Webb launched aboard an Ariane 5 rocket from Europe's Spaceport in French Guiana.", sourceUrl: "https://science.nasa.gov/mission/webb/webb-mission-timeline/" },
      { id: "l2", date: "2022-01-24", title: "Arrival near Sun–Earth L2", description: "Webb performed its arrival maneuver to enter its planned orbit around the Sun–Earth L2 region.", sourceUrl: "https://science.nasa.gov/mission/webb/webb-mission-timeline/" },
      { id: "first-images", date: "2022-07-12", title: "First science images released", description: "NASA released Webb's first full-color images and spectra, beginning its public science era.", sourceUrl: "https://science.nasa.gov/mission/webb/" }
    ],
    hardware: [
      { id: "observatory", name: "Webb observatory", status: "operational", description: "The telescope operates in a halo orbit around the Sun–Earth L2 region and cannot be serviced by astronauts there.", sourceUrl: "https://science.nasa.gov/mission/webb/faqs-full/" }
    ],
    scientificImpact: [{ id: "infrared", title: "Seeing the universe in infrared", description: "Webb's infrared observations reveal distant galaxies and structures within dusty star-forming regions that visible-light views can obscure.", sourceUrl: "https://science.nasa.gov/mission/webb/" }],
    whyItMatters: "Webb extends space astronomy with a large infrared observatory positioned far from Earth, designed to investigate cosmic history and planetary systems.", whyItMattersSourceUrl: "https://science.nasa.gov/mission/webb/",
    debrief: { questionId: "webb-infrared", difficulty: "Hard", question: "Why does Webb observe primarily in infrared light?", answers: [{ id: "a", text: "Infrared can reveal distant, redshifted objects and see through some cosmic dust" }, { id: "b", text: "Infrared makes the telescope orbit faster" }, { id: "c", text: "Infrared lets Webb land on planets" }, { id: "d", text: "Infrared prevents sunlight from reaching Earth" }], correctAnswerId: "a", explanation: "Infrared observations help Webb study distant early galaxies and regions of star formation obscured by dust.", sourceUrl: "https://science.nasa.gov/mission/webb/" }
  }
];

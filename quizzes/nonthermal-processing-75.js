/* New 75-item multiple-choice format. The original quiz data file is loaded unchanged. */
(() => {
  const d=window.QUIZ_DATA;
  if(!d?.sections)return;
  const source=d.sections.flatMap(s=>s.items);
  const terms=source.filter(q=>q.type==='identification').map(q=>q.answerText);
  const mcqFacts=source.filter(q=>q.type==='mcq');
  let tfIndex=0;
  let all=source.map((q,i)=>{
    if(q.type==='mcq')return {...q,question:`Identify the technology, mechanism, or concept described: ${q.explanation}`,section:'Identification · lecture clue'};
    if(q.type==='identification'){
      const answer=q.answerText, distractors=[...new Set(terms.filter(t=>t!==answer))].slice(i%7,(i%7)+3);
      while(distractors.length<3)distractors.push(['Radio frequency','Pulsed light','Ohmic heating'][distractors.length]);
      const choices=[answer,...distractors].slice(0,4);
      return {type:'mcq',question:q.question,choices,answer:0,explanation:q.explanation,source:q.source,section:'Identify the concept'};
    }
    const truth=q.choices?.[q.answer]==='True'||q.answer===true, fact=mcqFacts[tfIndex%mcqFacts.length], secondTruth=[true,false,true,false][tfIndex%4];
    const shownAnswer=secondTruth?fact.choices[fact.answer]:fact.choices.find((_,j)=>j!==fact.answer);
    const answer=truth?(secondTruth?2:0):(secondTruth?1:3);tfIndex++;
    return {type:'mcq',question:`Statement 1: ${q.question}\nStatement 2: The lecture's answer to “${fact.question}” is “${shownAnswer}.”\nWhich combination is correct?`,choices:['Only Statement 1 is true.','Only Statement 2 is true.','Both statements are true.','Both statements are false.'],answer,explanation:`Statement 1 is ${truth?'true':'false'}: ${q.explanation} Statement 2 is ${secondTruth?'true':'false'}: ${fact.explanation}`,source:`${q.source}; ${fact.source}`,section:'Two-statement analysis'};
  });
  const extras=[
    ['Which source describes industrial microwave frequencies most commonly used as 0.915 and 2.45 GHz?',['Microwave processing','Radio frequency processing','Ohmic heating','Pulsed electric fields'],0,'The lecture lists 0.915 and 2.45 GHz as common industrial microwave frequencies.','Slide 8'],
    ['Which technology uses an electric field between electrodes to heat food through ionic resistance?',['Ohmic heating','Pulsed light','Ultraviolet treatment','High pressure processing'],0,'Ohmic heating produces heat as current passes through food and encounters electrical resistance.','Slide 22'],
    ['Which technology uses short, high-power flashes from inert-gas lamps across UV, visible, and infrared bands?',['Pulsed light','Food irradiation','Oscillating magnetic fields','Radio frequency'],0,'Pulsed light uses intense, short-duration broad-spectrum flashes.','Slide 53'],
    ['In the pulsed-light lecture, fluence refers to what?',['Light energy received per unit surface area','Energy per unit volume of food','Number of microorganisms per gram','Exposure time multiplied by product thickness'],0,'Fluence is radiant energy received per unit surface area.','Slide 57'],
    ['Which microbial group is described as least susceptible to pulsed-light inactivation?',['Fungal spores','Gram-negative bacteria','E. coli','Gram-positive bacteria'],0,'The lecture ranks gram-negative bacteria as more susceptible than gram-positive bacteria, with fungal spores least susceptible.','Slide 57'],
    ['Which listed effect is photochemical in pulsed-light microbial inactivation?',['Formation of pyrimidine dimers in microbial DNA','Only temporary warming of the sample','Mechanical separation of cells','Ion movement through electrodes'],0,'Pyrimidine dimers are given as an example of photochemical damage.','Slide 56'],
    ['Which radio-frequency application is specifically mentioned?',['Postbaking drying of cookies, crackers, and pasta','Sterilizing canned low-acid foods','Fermenting yogurt','Removing stones from grain'],0,'The lecture describes RF as mainly used for postbaking drying of cookies, crackers, and pasta.','Slide 17'],
    ['Compared with microwaves, which property of radio waves is highlighted in the lecture?',['Longer wavelength and deeper penetration','Shorter wavelength and shallower penetration','No interaction with ionic material','Heating only at the surface'],0,'The lecture contrasts longer RF wavelengths and deeper penetration with shorter microwave wavelengths.','Slide 20'],
    ['Which component stores energy in a pulsed-light system?',['Storage capacitor','Sieve stack','Magnetron cavity only','Pressure intensifier'],0,'The listed pulsed-light components include a high-voltage supply, storage capacitor, pulse-forming network, flash lamp, and trigger.','Slide 54'],
    ['Which factor is explicitly listed as affecting pulsed-light treatment outcome?',['Target microorganism or enzyme','Grain angle of repose','Dough glutenin content','Salt crystal size'],0,'The lecture lists sample properties, target microorganism or enzyme, and fluence-related parameters.','Slide 57']
  ].map(([question,choices,answer,explanation,source])=>({type:'mcq',question,choices,answer,explanation,source,section:'Apply and compare'}));
  const analogies=[
    ['Radio frequency : longer wavelength and deeper penetration :: microwave : ____',['Shorter wavelength and shallower penetration','No interaction with food','Only surface heating','Longer wavelength and deeper penetration'],0,'The lecture contrasts longer RF wavelengths and deeper penetration with shorter microwave wavelengths.','Slide 20'],
    ['Ohmic heating : ionic resistance between electrodes :: inductive heating : ____',['Non-contact heating','Flash-lamp irradiation','Hydrostatic pressure','Ultraviolet exposure only'],0,'The lecture describes inductive heating as non-contact.','Slide 27'],
    ['Pulsed light : broad-spectrum flash lamps :: high-pressure processing : ____',['High pressure applied to food','Electric current through ions','UV-only continuous lamps','Magnetic field oscillation'],0,'These are distinct nonthermal technologies in the lecture outline.','Slides 3, 53-54'],
    ['Fluence : light energy per unit area :: fluence rate : ____',['Light energy per unit area per unit time','Total number of microbes in a sample','Pulse count multiplied by product thickness','Energy per unit volume only'],0,'Fluence rate is energy received per unit area and time.','Slides 57-58'],
    ['Photochemical inactivation : DNA pyrimidine dimers :: photothermal effect : ____',['Cell damage from a temperature rise','Density separation in air','Ionic resistance between electrodes','Alcohol vapor condensation'],0,'The lecture distinguishes photochemical molecular changes from photothermal damage caused by temperature rise.','Slide 56']
  ];
  analogies.forEach((a,i)=>Object.assign(extras[i],{question:a[0],choices:a[1],answer:a[2],explanation:a[3],source:a[4],section:'Complete the relationship'}));
  extras.slice(5).forEach((q,i)=>q.section='Apply the lecture');
  all=all.concat(extras).slice(0,75);
  all.forEach((q,i)=>{const shift=(i*3+1)%q.choices.length;q.choices=q.choices.slice(shift).concat(q.choices.slice(0,shift));q.answer=(q.answer-shift+q.choices.length)%q.choices.length});
  d.title='Nonthermal Processing · 75 MCQ';
  d.topic='Nonthermal Processing';
  d.sections=[{id:'mcq',title:'Multiple Choice',type:'mcq',items:all}];
})();

/* New 75-item multiple-choice format. The original quiz data file is loaded unchanged. */
(() => {
  const d=window.QUIZ_DATA;
  if(!d?.sections)return;
  const source=d.sections.flatMap(s=>s.items), terms=source.filter(q=>q.type==='identification').map(q=>q.answerText);
  const mcqFacts=source.filter(q=>q.type==='mcq');
  let tfIndex=0;
  let all=source.map((q,i)=>{
    if(q.type==='mcq')return {...q,question:`Identify the milling operation, product, or concept described: ${q.explanation}`,section:'Identification · lecture clue'};
    if(q.type==='identification'){
      const choices=[q.answerText,...new Set(terms.filter(t=>t!==q.answerText))].slice(0,4);
      while(choices.length<4)choices.push(['Sieving','Aspiration','Conditioning'][choices.length-1]);
      return {type:'mcq',question:q.question,choices,answer:0,explanation:q.explanation,source:q.source,section:'Identify the milling concept'};
    }
    const truth=q.choices?.[q.answer]==='True'||q.answer===true, fact=mcqFacts[tfIndex%mcqFacts.length], secondTruth=[true,false,true,false][tfIndex%4];
    const shownAnswer=secondTruth?fact.choices[fact.answer]:fact.choices.find((_,j)=>j!==fact.answer);
    const answer=truth?(secondTruth?2:0):(secondTruth?1:3);tfIndex++;
    return {type:'mcq',question:`Statement 1: ${q.question}\nStatement 2: The lecture's answer to “${fact.question}” is “${shownAnswer}.”\nWhich combination is correct?`,choices:['Only Statement 1 is true.','Only Statement 2 is true.','Both statements are true.','Both statements are false.'],answer,explanation:`Statement 1 is ${truth?'true':'false'}: ${q.explanation} Statement 2 is ${secondTruth?'true':'false'}: ${fact.explanation}`,source:`${q.source}; ${fact.source}`,section:'Two-statement analysis'};
  });
  const extras=[
    ['What is the objective of rice milling?',['Remove hull, bran, and embryo while preserving the endosperm core','Remove only the hull while retaining all bran','Separate gluten from starch','Maximize breakage of the endosperm'],0,'Rice milling aims to remove hull, bran, and embryo as completely as possible without breaking the remaining endosperm core.','Slide 13'],
    ['Why should rice grain temperature remain at or below 43–44°C during whitening?',['Whitening generates frictional heat that can raise grain temperature','The rice must stay below its dehulling moisture','Abrasive cones need a fixed temperature to separate flour','Polishing requires the grain to remain frozen'],0,'The lecture notes that whitening involves friction and heat, and grain temperature should not exceed 43–44°C.','Slide 17'],
    ['What does the Martin wet-milling process do to dough under water sprays?',['Gluten agglomerates while starch washes out','Starch agglomerates while gluten dissolves','Bran is separated by air aspiration','The dough is dried and rolled into flakes'],0,'The Martin process kneads dough under water sprays; gluten agglomerates and starch washes out.','Slide 59'],
    ['Which property differentiates flour purity in the lecture?',['Color and mineral concentration','Only moisture content','Glutenin and gliadin ratio alone','Grain length and angle of repose'],0,'Color and mineral concentration are listed as indicators; bran has a higher mineral concentration.','Slide 35'],
    ['Why is it difficult to obtain white flour by perfectly separating endosperm from other grain tissues?',['The 82% endosperm cannot be separated exactly from bran, aleurone, and embryo','White endosperm makes up only 18% of the grain','The embryo dissolves during conditioning','Bran and aleurone have identical composition to endosperm'],0,'The lecture states that the grain has about 82% white starchy endosperm but cannot be separated exactly from the other tissues.','Slide 34'],
    ['Which wheat milling system uses four or five break grinds, each followed by sieving?',['The break system','The reduction system','The wet batter process','Solvent extraction milling'],0,'The break system is described as four or five break grinds followed by sieving stages.','Slide 26'],
    ['Why is water important in quinoa milling?',['Saponin is present in the fruit and seed coats','Water forms gluten in quinoa','Water removes the embryo only','Quinoa milling depends on starch gelatinization'],0,'The lecture identifies seed and fruit coat saponin as the reason water is crucial.','Slide 24'],
    ['Which flour type is associated with soft, low-protein wheat and low alpha-amylase activity?',['Cake flour','Bread flour','Semolina','Wholegrain flour'],0,'The lecture describes cake flour as soft, low protein, and low in alpha-amylase activity.','Slide 51'],
    ['What does flour extraction express?',['The basis or reference point used to calculate flour yield','The amount of gluten retained after baking','The percentage of water used for conditioning only','The color grade of flour'],0,'The slide lists several possible bases, including wheat received, cleaned wheat, conditioned wheat, or total products.','Slide 34'],
    ['Which grain milling process is described as neither strictly dry nor strictly wet?',['Rice solvent extraction milling','Martin wheat milling','Maize wet milling','Barley pearling'],0,'Rice solvent extraction milling has stages associated with both categories, so it is not strictly dry or wet.','Slide 62']
  ].map(([question,choices,answer,explanation,source])=>({type:'mcq',question,choices,answer,explanation,source,section:'Apply and compare'}));
  const analogies=[
    ['Sieving : size-based separation :: air separation : ____',['Density-based separation by air current','Removal of saponins with water','Frictional polishing','Gluten agglomeration'],0,'Sieving separates by size; air separation uses an air current to carry lower-density particles more readily.','Slide 11'],
    ['Martin process : dough kneaded under water sprays :: batter process : ____',['Flour-water batter dispersed in excess water','Wheat tempered between rollers','Rice polished to remove aleurone','Bran detached by dry sieving'],0,'The batter process disperses flour-water batter in excess water, then separates gluten curds from starch milk.','Slide 59'],
    ['Semolina : coarse durum grind for pasta :: farina : ____',['Purified endosperm particle used in breakfast cereals','All ground fractions of cleaned grain','Bran-rich flour with undefined proportions','Rice bran extracted for oil'],0,'Farina is a coarser purified endosperm particle often used in breakfast cereals.','Slide 29'],
    ['Whitening : friction removes outer bran layers :: polishing : ____',['Removes remaining inner layers, including aleurone','Separates grain by specific gravity','Converts starch to gluten','Adds water to form masa'],0,'Polishing removes remaining inner layers and can reduce oxidative rancidity by removing aleurone.','Slide 19'],
    ['Wholegrain flour : all ground products of cleaned grain :: brown flour : ____',['White flour plus some bran and germ, proportions undefined','Only purified durum endosperm','Flour treated with chlorine for cake making','A flour-water batter before gluten curds form'],0,'The lecture describes brown flour as white flour with some bran and germ, without defined proportions.','Slides 37-38']
  ];
  analogies.forEach((a,i)=>Object.assign(extras[i],{question:a[0],choices:a[1],answer:a[2],explanation:a[3],source:a[4],section:'Complete the relationship'}));
  extras.slice(5).forEach((q,i)=>q.section='Apply the lecture');
  all=all.concat(extras).slice(0,75);
  all.forEach((q,i)=>{const shift=(i*3+1)%q.choices.length;q.choices=q.choices.slice(shift).concat(q.choices.slice(0,shift));q.answer=(q.answer-shift+q.choices.length)%q.choices.length});
  d.title='The Milling Process · 75 MCQ'; d.topic='Cereal Science and Technology';
  d.sections=[{id:'mcq',title:'Multiple Choice',type:'mcq',items:all}];
})();

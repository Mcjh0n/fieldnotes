/* New 75-item multiple-choice format. The original quiz data file is loaded unchanged. */
(() => {
  const d=window.QUIZ_DATA;
  if(!d?.sections)return;
  const source=d.sections.flatMap(s=>s.items), terms=source.filter(q=>q.type==='identification').map(q=>q.answerText);
  let all=source.map((q,i)=>{
    if(q.type==='mcq')return {...q,section:'Multiple Choice'};
    if(q.type==='identification'){
      const choices=[q.answerText,...new Set(terms.filter(t=>t!==q.answerText))].slice(0,4);
      while(choices.length<4)choices.push(['Sieving','Aspiration','Conditioning'][choices.length-1]);
      return {type:'mcq',question:q.question,choices,answer:0,explanation:q.explanation,source:q.source,section:'Identify the milling concept'};
    }
    const truth=q.answer===true;
    return {type:'mcq',question:`Modified true/false: ${q.question}`,choices:['The statement accurately describes the lecture.','The statement reverses the process described in the lecture.','The statement assigns the process to a different milling stage.','The statement contradicts the lecture.'],answer:truth?0:3,explanation:q.explanation,source:q.source,section:'Analyze the statement'};
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
  all=all.concat(extras).slice(0,75);
  d.title='The Milling Process · 75 MCQ'; d.topic='Cereal Science and Technology';
  d.sections=[{id:'mcq',title:'Multiple Choice',type:'mcq',items:all}];
})();

/* Adds varied, lecture-grounded stems to the generated 75-question quizzes. */
(() => {
  const d=window.QUIZ_DATA;
  if(!d?.sections||d.sections.length!==1)return;
  const original=d.sections[0].items;
  if(original.length!==75)return;
  const topic=d.topic||d.title;
  if(d.title.startsWith('Cereal Storage and Pre-Processing')){
    const ids=original.filter(q=>q.section==='Identify from a clue'||q.section==='Identify the storage concept'),sets=original.filter(q=>q.section==='Identify the complete set'||q.section==='Choose the complete set'),applies=original.filter(q=>q.section==='Apply the concept');
    const shuffle=q=>{const shift=(q.seed*3+1)%q.choices.length;q.choices=q.choices.slice(shift).concat(q.choices.slice(0,shift));q.answer=(q.answer-shift+q.choices.length)%q.choices.length;delete q.seed;return q};
    const all=[];ids.slice(0,25).forEach((q,i)=>all.push(shuffle({...q,section:'Identify from a clue',seed:i})));sets.slice(0,25).forEach((q,i)=>all.push(shuffle({...q,section:'Choose the complete set',seed:i+25})));
    for(let i=0;i<10;i++){const a=ids[i],b=ids[(i+7)%ids.length],aTrue=i%2===0,bTrue=i%3!==0;const statement=(q,t)=>`The lecture matches “${q.question}” with “${t?q.choices[q.answer]:q.choices.find((_,j)=>j!==q.answer)}”.`;const answer=aTrue?(bTrue?2:0):(bTrue?1:3);all.push({type:'mcq',question:`Statement 1: ${statement(a,aTrue)}\nStatement 2: ${statement(b,bTrue)}\nWhich combination is correct?`,choices:['Only Statement 1 is true.','Only Statement 2 is true.','Both statements are true.','Both statements are false.'],answer,explanation:`Statement 1 is ${aTrue?'true':'false'}: ${a.explanation} Statement 2 is ${bTrue?'true':'false'}: ${b.explanation}`,source:`${a.source}; ${b.source}`,section:'Two-statement analysis'})}
    const analogies=[
      ['Aspiration : light impurities carried by air :: stoning separator : ____',['Stones separated from grain','Moisture added for conditioning','Grain lifted by buckets','Grain germination stopped'],0,'Aspiration uses air flow; stoning separators remove stones.','Slides 33-34'],
      ['Grain respiration : oxygen use and carbon dioxide release :: germination : ____',['Grain begins to sprout and uses stored reserves','Grain is separated by specific gravity','Grain is polished to remove aleurone','Grain is conditioned with salt'],0,'The storage lecture treats respiration and germination as distinct deterioration processes.','Slides 18-19'],
      ['Angle of repose : slope of a grain pile :: drying : ____',['Reduction of grain moisture','Removal of stones by screening','Air transport of light particles','Water addition before milling'],0,'Angle of repose describes grain-pile behavior; drying lowers grain moisture.','Slides 11, 29-30'],
      ['Bucket elevator : raises grain vertically :: screw conveyor : ____',['Moves raw material through a rotating screw','Separates by color','Removes metal with magnets','Controls the grain pile slope'],0,'Both are grain-handling equipment, but screw conveyors transport material with a rotating screw.','Slides 9, 33'],
      ['Damping : adds moisture before processing :: conditioning : ____',['Allows moisture to distribute through the grain','Removes all bran from grain','Measures flour color','Separates grain by density'],0,'The lecture describes damping/conditioning as moisture adjustment before further processing.','Slides 35-36']
    ];
    analogies.forEach(([question,choices,answer,explanation,source],i)=>all.push(shuffle({type:'mcq',question,choices,answer,explanation,source,section:'Complete the relationship',seed:i+50})));
    applies.slice(0,10).forEach((q,i)=>all.push(shuffle({...q,question:`A cereal handler faces this situation: ${q.explanation} Which lecture concept or answer best applies?`,section:'Apply the concept',seed:i+60})));
    d.sections=[{id:'mcq',title:'Multiple Choice',type:'mcq',items:all.slice(0,75)}];return;
  }
  if(!d.mixStyles)return;
  const analogies={
    'Cereal Science and Technology':[
      ['Glutenin : elasticity :: gliadin : ____',['Extensibility','Leavening','Acidity','Water absorption'],0,'The lecture assigns elasticity to glutenin and extensibility to gliadin.','Slide 16'],
      ['Baking soda : needs acid to release CO₂ :: baking powder : ____',['Contains an acid source and can release gas without recipe acid','Needs yeast to ferment','Works only with steam','Requires glutenin'],0,'Baking powder contains sodium bicarbonate and an acid source.','Slide 24'],
      ['Yeast : biological leavening :: baking powder : ____',['Chemical leavening','Physical leavening','Dough conditioning','Flour extraction'],0,'Yeast is a biological leavener; baking powder is a chemical leavener.','Slides 19-24'],
      ['Protein : about 2.0 g water absorbed per gram :: damaged starch : ____',['About 1.0 g per gram','About 0.3 g per gram','About 14 g per gram','No water absorption'],0,'The lecture gives 2.0 g/g for protein, 1.0 g/g for damaged starch, and 0–0.3 g/g for undamaged starch.','Slide 37'],
      ['Steam : cream puffs :: trapped air : ____',['Sponge cakes','Sourdough only','Cured meats','Milled rice'],0,'Steam leavens cream puffs; mechanically incorporated air is used in sponge cakes.','Slides 26-27']
    ],
    'Cereal Science and Technology · Other Cereal Products':[
      ['Moroccan couscous : poppy-seed size :: Israeli pearl couscous : ____',['Peppercorn size','Large hand-rolled pellets','Rice-bran size','Flour particles'],0,'The lecture compares Moroccan couscous to poppy seeds and Israeli couscous to peppercorns.','Slides 26-27'],
      ['Malting : germination and enzyme formation :: mashing : ____',['Converting starch to maltose in warm water','Separating wort from husks','Aging finished beer','Collecting spirit vapor'],0,'Mashing mixes crushed malt with warm water so enzymes convert starch to maltose.','Slides 38-40'],
      ['Lautering : separating wort from husks :: boiling : ____',['Sterilizing wort and extracting hop bitterness and aroma','Forming masa from nixtamal','Producing barley malt by germination','Condensing alcohol vapor'],0,'Boiling sterilizes wort, extracts hop bitterness and aroma, and concentrates the liquid.','Slides 40-41'],
      ['Steam-rolling : 3–5 minutes :: steam-flaking : ____',['15–30 minutes','1–2 minutes','45–60 minutes','Several days'],0,'The lecture lists 3–5 minutes for steam-rolling and 15–30 minutes for steam-flaking.','Slide 78'],
      ['Nixtamal : corn cooked and steeped in alkali :: masa : ____',['Soft dough ground from nixtamal','Sweet wort from malt','Parboiled rice bran','Distilled grain spirit'],0,'Nixtamal is ground to produce the soft dough called masa.','Slides 4-6']
    ],
    'Food Processing and Preservation':[
      ['Benzoic acid : high-acid foods :: nitrite : ____',['Cured-meat safety against C. botulinum toxin formation','Gouda gas control only','Fat oxidation control','Sweetness in diabetic foods'],0,'The lecture links benzoic acid to acidic foods and nitrite to inhibition of C. botulinum toxin formation in cured meats.','Slides 39-42'],
      ['BHA : antioxidant :: benzoate : ____',['Antimicrobial preservative','Nutritive sweetener','Natural colorant','Enzyme preparation'],0,'BHA is listed as an antioxidant; benzoates are listed among antimicrobial preservatives.','Slide 35'],
      ['Sorbitol : about half sucrose sweetness :: saccharin : ____',['About 500 times sucrose sweetness','Equal sweetness to sucrose','About twice sucrose sweetness','No sweetness'],0,'The lecture gives sorbitol as about half as sweet as sucrose and saccharin as 500 times sweeter.','Slides 79-80'],
      ['Direct additive : intentionally added for function :: indirect additive : ____',['Enters in trace amounts through packaging, storage, or handling','Always occurs naturally in foods','Used only to preserve wine','Always remains in final food'],0,'The lecture distinguishes intentional direct additives from indirect additives introduced during handling.','Slides 23-24'],
      ['Primary antioxidant : terminates free-radical chains :: acidulant : ____',['Adds acidity or tartness to food','Inhibits toxin formation in cured meat','Creates a color by pigment deposition','Separates starch from gluten'],0,'Primary antioxidants terminate radical chains; acids can serve as acidulants and preservatives.','Slides 50, 57']
    ],
    'Food Processing and Preservation · Thermal Death Kinetics':[
      ['D-value : time for 90% reduction :: Z-value : ____',['Temperature change for a tenfold change in D-value','Time for a 12-log reduction','Percent population surviving','Total heat penetration time'],0,'D is a time measure; Z is the temperature change associated with a tenfold D-value change.','Slides 10, 18'],
      ['One D reduction : 90% reduction :: 3D : ____',['99.9% reduction','90% reduction','99% reduction','99.9999% reduction'],0,'The lecture’s sterilizing-value table gives 3D as 99.9%.','Slide 17'],
      ['F-value : total thermal processing time under stated conditions :: SV : ____',['Number of decimal reductions achieved','Temperature change for a tenfold D shift','Time for one decimal reduction only','Initial population size'],0,'F expresses thermal death time; SV counts decimal reductions achieved.','Slides 17, 24'],
      ['Higher temperature : lower D-value :: lower Z-value : ____',['Greater sensitivity of D-value to temperature change','Slower microbial killing at every temperature','No response to temperature','Higher initial population'],0,'The lecture says higher temperature lowers D, and lower Z means greater temperature sensitivity.','Slide 18'],
      ['F250 : 2.5-minute minimum botulinum cook :: F0 reference in Celsius : ____',['121°C','100°C','75°C','250°C'],0,'The lecture gives 121°C as the Celsius reference for F0 calculations.','Slides 26, 30']
    ]
  }[topic]||[];
  const shuffle=q=>{const shift=(q.orderSeed*3+1)%4;q.choices=q.choices.slice(shift).concat(q.choices.slice(0,shift));q.answer=(q.answer-shift+4)%4;delete q.orderSeed;return q};
  const all=[];
  for(let i=0;i<25;i++){
    const group=original.slice(i*3,i*3+3),id=group[0],scenario=group[1],clue=group[2];
    all.push(shuffle({...id,question:`Identify the lecture term or concept: ${id.explanation}`,section:'Identify from a clue',orderSeed:i}));
    const sceneTemplates=[`A learner encounters this case in ${topic}:`,`During a ${topic.toLowerCase()} task, a student must explain:`,`A processor needs to respond to this lecture-based situation:`,`While reviewing a worked example, a student notes:`,`A product or process shows this result:`];
    all.push(shuffle({...scenario,question:`${sceneTemplates[i%sceneTemplates.length]} ${scenario.explanation} Which option best applies?`,section:'Apply the concept',orderSeed:i+25}));
    if(i%5===0){
      const other=original[((i+5)%25)*3];
      const truthPairs=[[true,false],[false,true],[true,true],[false,false],[true,false]], [firstTrue,secondTrue]=truthPairs[Math.floor(i/5)];
      const statement=(f,isTrue)=>{const answer=f.choices[f.answer];const wrong=f.choices.find((c,j)=>j!==f.answer)||'an unrelated concept';return `The lecture matches “${f.question.replace(/[?]$/,'')}” with “${isTrue?answer:wrong}”.`};
      const a=statement(id,firstTrue),b=statement(other,secondTrue);
      const answer=firstTrue?(secondTrue?2:0):(secondTrue?1:3);
      all.push({type:'mcq',question:`Statement 1: ${a}\nStatement 2: ${b}\nWhich combination is correct?`,choices:['Only Statement 1 is true.','Only Statement 2 is true.','Both statements are true.','Both statements are false.'],answer,explanation:`Statement 1 is ${firstTrue?'true':'false'}; Statement 2 is ${secondTrue?'true':'false'}. ${id.explanation} ${other.explanation}`,source:`${id.source||''}; ${other.source||''}`,section:'Two-statement analysis'});
    }else if(i%5===1){
      const a=analogies[Math.floor(i/5)%analogies.length];
      all.push({type:'mcq',question:a[0],choices:a[1],answer:a[2],explanation:a[3],source:a[4],section:'Complete the relationship'});
    }else if(i%5===2){
      const other=original[((i+8)%25)*3],other2=original[((i+13)%25)*3],other3=original[((i+18)%25)*3];
      const answer=id.choices[id.answer];
      const options=[id.explanation,other.explanation,other2.explanation,other3.explanation];
      all.push(shuffle({type:'mcq',question:`Which explanation distinguishes “${answer}” from the nearby concept tested here?`,choices:options,answer:0,explanation:id.explanation,source:id.source,section:'Compare carefully',orderSeed:i+50}));
    }else{
      all.push(shuffle({...clue,question:`Read carefully: which lecture concept is identified by this precise description? ${clue.explanation}`,section:'Careful understanding',orderSeed:i+50}));
    }
  }
  d.sections=[{id:'mcq',title:'Multiple Choice',type:'mcq',items:all}];
})();

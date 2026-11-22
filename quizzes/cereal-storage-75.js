/* New 75-item MCQ version; the original storage quiz data remains unchanged. */
(() => {
 const d=window.QUIZ_DATA;if(!d?.sections)return;
 const source=d.sections.flatMap(s=>s.items),answers=source.map(q=>q.answerText||q.answerItems?.join(' · ')).filter(Boolean);
 const items=source.map((q,i)=>{const answer=q.answerText||q.answerItems.join(' · '),choices=[answer,...answers.filter(a=>a!==answer).slice(i%8,(i%8)+3)];while(choices.length<4)choices.push(['Drying','Aspiration','Conditioning'][choices.length-1]);return {type:'mcq',question:q.question,choices,answer:0,explanation:q.explanation,source:q.source,section:q.type==='enumeration'?'Choose the complete set':'Identify the storage concept'}});
 const extras=items.slice(0,25).map(q=>({...q,question:`Applied review: ${q.question}`,section:'Apply the concept'}));
 d.title='Cereal Storage and Pre-Processing · 75 MCQ';d.sections=[{id:'mcq',title:'Multiple Choice',type:'mcq',items:items.concat(extras).slice(0,75)}];
})();

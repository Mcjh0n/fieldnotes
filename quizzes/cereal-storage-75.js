/* New 75-item MCQ version; the original storage quiz data remains unchanged. */
(() => {
 const d=window.QUIZ_DATA;if(!d?.sections)return;
 const source=d.sections.flatMap(s=>s.items),answers=source.map(q=>q.answerText||q.answerItems?.join(' · ')).filter(Boolean);
 const items=source.map((q,i)=>{const answer=q.answerText||q.answerItems.join(' · '),choices=[answer,...answers.filter(a=>a!==answer).slice(i%8,(i%8)+3)];while(choices.length<4)choices.push(['Drying','Aspiration','Conditioning'][choices.length-1]);const prompt=q.type==='identification'?`Identify the cereal-storage term or concept described: ${q.explanation}`:`Which complete set identifies the items requested? ${q.question}`;return {type:'mcq',question:prompt,choices,answer:0,explanation:q.explanation,source:q.source,section:q.type==='enumeration'?'Identify the complete set':'Identify from a clue'}});
 const extras=items.slice(0,25).map(q=>({...q,question:`A storage or pre-processing situation calls for this concept: ${q.explanation} Which term or answer set fits?`,section:'Apply the concept'}));
 const all=items.concat(extras).slice(0,75);all.forEach((q,i)=>{const shift=(i*3+1)%q.choices.length;q.choices=q.choices.slice(shift).concat(q.choices.slice(0,shift));q.answer=(q.answer-shift+q.choices.length)%q.choices.length});
 d.title='Cereal Storage and Pre-Processing · 75 MCQ';d.sections=[{id:'mcq',title:'Multiple Choice',type:'mcq',items:all}];
})();

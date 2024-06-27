//your JS code here. If required.
const tableBody=document.getElementById('output')
 
tableBody.innerHTML=`
	<tr id="loading">
		<td colspan="2">Loading...</td>
	</tr>
`
 
const randomTime=()=>{
	return (Math.random()*2)+1
}
          
const promise1=new Promise((res,rej)=>{
	const time=randomTime()
	setTimeout(()=>res({name:"Promise 1",time}),time*1000)
})
const promise2= new Promise((res,rej)=>{
	const time=randomTime()
	setTimeout(()=>res({name:"Promise 2",time}),time*1000)
})
const promise3= new Promise((res,rej)=>{
	const time=randomTime()
	setTimeout(()=>res({name:"Promise 3",time}),time*1000)
})

const finalPromise=()=>{
	 return Promise.all([promise1,promise2,promise3])
}

finalPromise()
	.then((values)=>{
		const total=values.reduce((acc,curr)=>acc+Number(curr.time),0)		
		
		const tableRows=values.map((value)=>(
			`
			<tr>
				<td>${value.name}</td>
				<td>${value.time}</td>
			</tr>
		   `
		)).join(' ')

		tableBody.innerHTML=`${tableRows} 
			<tr>
				<td>Total</td>
				<td>${total}</td>
			</tr>
		`
		
	})
	.catch((err)=>console.error(err))
	
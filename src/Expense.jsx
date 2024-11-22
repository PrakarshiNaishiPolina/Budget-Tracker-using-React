import React,{useState} from "react";

function Expense(){
    const [expenses,setExpenses]=useState([]);
    const [category,setCategory]=useState("");
    const [description,setDescription]=useState("");
    const [amount,setAmount]=useState("");
    const [date,setDate]=useState("");

    const[editingIndex,setEditingIndex]=useState(null); // to edit the expense

    const handleCategory=(event)=>{
        setCategory(event.target.value);

    };

    const handleDescription=(event)=>{
        setDescription(event.target.value);
    };

    const handleAmount=(event)=>{
        setAmount(event.target.value);
    };

    const handleDate=(event)=>{
        setDate(event.target.value);
    };


    const handleSubmit=(event)=>{
        event.preventDefault();
        if(category &&parseFloat(amount)>0 &&date){
        const newExpenses ={category,description,amount:parseFloat(amount),date};
        if(editingIndex!==null){
      //if we are editing an expense
      const updatedExpenses =expenses.map((expense,index)=>
    index===editingIndex?newExpenses:expense
    );
      setExpenses(updatedExpenses);
      setEditingIndex(null);  // Reset editing mode
        
        
        }else{
        // If we are adding a new expense
        setExpenses([...expenses,newExpenses]);
       
        }
        setCategory("");
        setDescription("");
        setAmount("");
        setDate("");
    }
    };
    // amount comes from the input field, which provides values as strings (e.g., "12.34" instead of 12.34).
    // parseFloat(amount) converts the string to a floating-point number.


    

    const getAmount=()=>{
        return expenses.reduce((total,expense)=>total+(expense.amount||0),0).toFixed(2);

    };

    const handleDelete=(index)=>{
        setExpenses(expenses.filter((_,i)=>i!==index))
    }

    const handleEdit = (index) => {
        const expense = expenses[index];
        setCategory(expense.category);
        setDescription(expense.description);
        setAmount(expense.amount.toString());
        setDate(expense.date);
        setEditingIndex(index);  // Mark which expense is being edited
    };
    


    return(<>
    <h1> Expense Tracker</h1>
    <p> You have spent :${getAmount()}</p>
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter the category" onChange={handleCategory} value={category} required></input><br></br>
        <input type="text" placeholder="Enter the description" value={description} onChange={handleDescription}></input><br></br>
        <input type="number" placeholder="Enter the amount" step="0.01" onChange={handleAmount}value={amount} required></input><br></br>
        <input type="date" onChange={handleDate} value={date} required></input><br></br>
        <button>{editingIndex !== null ? "Update Expense" : "Add Expense"}</button>

    </form>
    <h2> Expenses List:</h2>
    <ul>
        {expenses.map((expense,index)=>(
            <li key={index}>

            <p>
                <strong>Category:</strong>{expense.category}
            </p>

            <p>
                <strong>Description:</strong>{expense.description}
            </p>

            <p>
                <strong>Amount:</strong>{expense.amount.toFixed(2)}
            </p>

            <p>
                <strong>Date:</strong>{expense.date}
            </p>
            <div className="button-container">

            <button onClick={()=>handleDelete(index)}>Delete</button>
            <button onClick={()=>handleEdit(index)}>Update</button>


            </div>

          

            </li>



        ))}
    </ul>
    
    </>);
}

export default Expense;


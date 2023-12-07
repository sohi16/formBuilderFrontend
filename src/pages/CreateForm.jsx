import React, { useState } from 'react';
import CategorizedQuestion from '../Components/CategorizedQuestion/CategorizedQuestion';
import ClozeQuestion from '../Components/ClozeQuestion/ClozeQuestion';
import ComprehensionQuestion from '../Components/ComprehensionQuestion/ComprehensionQuestion';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css'
import Header from '../Components/Header/Header';

export const CreateForm = (state) => {
    console.log(state)
    const [formId, setFormId] = useState('');
    const [questions, setQuestions] = useState([]);
    const [header, setHeader] = useState('');
    
    const addQuestion = (type) => {
        let initialData;
        if (type === 'Categorize') {
            initialData = { categories: [], items: [{ name: '', category: '' }] };
        } else if (type === 'Cloze') {
            initialData = { paragraph: '', options: [] };
        } else if (type === 'Comprehension') {
            initialData = { instructions: '', passage: '', subQuestions: [] };
        }
        setQuestions([...questions, { type, points: 10, data: initialData }]);
    };

    const removeQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const handleQuestionDataChange = (index, data) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = { ...updatedQuestions[index], data };
        setQuestions(updatedQuestions);
    };

    const handlePointsChange = (index, points) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].points = points;
        setQuestions(updatedQuestions);
    };

    const handleSaveForm = async () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
        const charactersLength = characters.length;
        let randomId = '';

        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            randomId += characters.charAt(randomIndex);
        }
        setFormId(randomId);
        if (!header) {
            alert('Add Form title');
            return;
        }
        if (questions.length === 0) {
            alert('Add at least one Question');
            return;
        }//
        const formData = { formId: randomId, header, questions };
        
        
            try {
              const response = await fetch('http://localhost:5000/createForm', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  
                },
                body: JSON.stringify(formData), 
              });
          
              if (response.ok) {
                const data = await response.json();
                console.log('Form data saved:', data);
                alert('Form saved')
              } else {
                throw new Error('Failed to save form data');
              }
            } catch (error) {
              console.error('Error saving form data:', error.message);
             
            }
          
    };
    

    return (
        <div className='w-full max-w-screen-xl mx-auto mb-20 border-2 p-5 pb-10 border-gray-400 rounded-lg'>
            <h2 className='text-3xl font-bold mb-4 p-5 text-center'>Form Builder</h2>
           
            <Header setHeader={setHeader}></Header>
            <hr className='w-full mt-4 mb-4 border-gray-300'/>
            {questions.map((question, index) => (
                <div key={index} className='border-1 p-4 rounded mb-4'>
                    <div className='flex justify-between p-2'>
                        
                        <div>
                            <label className='block mb-2 text-gray-700 font-bold text-left text-lg'>Question {index + 1}:</label>
                        </div>

                        
                        <div className='flex gap-4'>
                            <label className='block mb-2 text-gray-700 font-bold text-left'>Points:</label>
                            <input
                                type='number'
                                min={1}
                                value={question.points}
                                onChange={(e) => handlePointsChange(index, e.target.value)}
                                className='block bg-gray-200 w-[70px] rounded-md border-fuchsia-200 py-2 px-3 mb-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            />
                        </div>

                        
                        <button onClick={() => removeQuestion(index)} className='text-red-500 font-bold'>
                            Delete Question
                        </button>
                    </div>

                    {question.type === 'Categorize' && (
                        <CategorizedQuestion
                            questionIndex={index}
                            questionData={question}
                            updateQuestionData={(index, data) => handleQuestionDataChange(index, data)}
                        />
                    )}

                    {question.type === 'Cloze' && (
                        <ClozeQuestion
                            questionIndex={index}
                            questionData={question}
                            updateQuestionData={(index, data) => handleQuestionDataChange(index, data)}
                        />
                    )}

                    {question.type === 'Comprehension' && (
                        <ComprehensionQuestion
                            questionIndex={index}
                            questionData={question}
                            updateQuestionData={(index, data) => handleQuestionDataChange(index, data)}
                        />
                    )}
                </div>
            ))}

            <div className='mb-4 text-left'>
                <label className='text-xl font-bold mr-6 text-gray-800'>Select Question Type :</label>
                <div className='text-center flex gap-10 justify-center mt-6'>
                    <button
                        onClick={() => addQuestion('Categorize')}
                        className='border-1 p-3 text-black-900 font-semibold bg-fuchsia-200 rounded'
                    >
                        + Add Categorize Question
                    </button>
                    <button onClick={() => addQuestion('Cloze')} className='border-1 p-3 text-black-900 font-semibold bg-fuchsia-200 rounded'>
                        + Add Cloze Question
                    </button>
                    <button
                        onClick={() => addQuestion('Comprehension')}
                        className='border-1 p-3 text-black-900 font-semibold bg-fuchsia-200 rounded'
                    >
                        + Add Comprehension Question
                    </button>
                </div>
            </div>
            <div className='flex justify-center mt-6'>
                <button
                    onClick={handleSaveForm}
                    className='bg-fuchsia-500 hover:bg-fuchsia-300 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500'
                >
                    Save Form
                </button>
            </div>
             {header && questions.length !== 0 ? (
                <div className='flex justify-center mt-4'>
                    <Link to={`/preview/?formId=${formId}`} >
                        <button
                            className='bg-fuchsia-500 hover:bg-fuchsia-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500'
                        >
                            Preview/Fill
                        </button>
                    </Link>
                </div>
            ) : null
            } 
        </div>

    );
};

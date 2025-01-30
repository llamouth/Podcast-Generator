import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Form = ({ setLoading, setResponseData }) => {

    let section = 'introduction';

    const parsePodcastScript = (script) => {
        const sections = {
          introduction: [],
          mainContent: [],
          conclusion: [],
        };
    
        script.forEach((line) => {

          if (line.includes("Main Content")) {
            section = 'mainContent';
          } else if (line.includes("Conclusion")) {
            section = 'conclusion';
          }
          
          sections[section].push(line);

        });
    
        return sections;
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            commentators: 1,
            length: 10, 
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(50, 'Must be 50 characters or less')
                .required('Required'),
            description: Yup.string()
                .max(500, 'Must be 500 characters or less'),
            commentators: Yup.number()
                .min(1, 'Must be at least 1')
                .required('Required'),
            length: Yup.number()
                .min(1, 'Must be at least 1 minute')
                .required('Required'),
        }),
        onSubmit: async values => {
            setLoading(true);
            setResponseData({}); // Clear previous response data
            try {
                const response = await fetch('http://localhost:3333/gemini', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                const data = await response.json();
                const paresedScript = parsePodcastScript(data);
                setResponseData(paresedScript); // Ensure data is an array of strings
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="w-full max-w-full mx-auto p-2 bg-white shadow-lg rounded-lg flex flex-wrap">
            <div className="mb-2 w-full md:w-1/2 px-1">
                <label htmlFor="title" className="block text-gray-700 font-semibold mb-1 text-xs">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.title}</div>
                ) : null}
            </div>

            <div className="mb-2 w-full md:w-1/2 px-1">
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-1 text-xs">Description</label>
                <textarea
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                />
                {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.description}</div>
                ) : null}
            </div>

            <div className="mb-2 w-full md:w-1/2 px-1">
                <label htmlFor="commentators" className="block text-gray-700 font-semibold mb-1 text-xs">Amount of Commentators</label>
                <input
                    id="commentators"
                    name="commentators"
                    type="number"
                    min="1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.commentators}
                    className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                />
                {formik.touched.commentators && formik.errors.commentators ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.commentators}</div>
                ) : null}
            </div>

            <div className="mb-2 w-full md:w-1/2 px-1">
                <label htmlFor="length" className="block text-gray-700 font-semibold mb-1 text-xs">Length (minutes)</label>
                <input
                    id="length"
                    name="length"
                    type="number"
                    min="1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.length}
                    className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                />
                {formik.touched.length && formik.errors.length ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.length}</div>
                ) : null}
            </div>

            <div className="mb-2 w-full flex justify-center">
                <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out text-xs">
                    Generate
                </button>
            </div>
        </form>
    );
};

export default Form;
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Form = () => {
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
                .max(500, 'Must be 500 characters or less')
                .required('Required'),
            commentators: Yup.number()
                .min(1, 'Must be at least 1')
                .required('Required'),
            length: Yup.number()
                .min(1, 'Must be at least 1 minute')
                .required('Required'),
        }),
        onSubmit: values => {
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.title}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                <textarea
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.description}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label htmlFor="commentators" className="block text-gray-700 font-bold mb-2">Amount of Commentators</label>
                <input
                    id="commentators"
                    name="commentators"
                    type="number"
                    min="1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.commentators}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.commentators && formik.errors.commentators ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.commentators}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label htmlFor="length" className="block text-gray-700 font-bold mb-2">Length (minutes)</label>
                <input
                    id="length"
                    name="length"
                    type="number"
                    min="1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.length}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.length && formik.errors.length ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.length}</div>
                ) : null}
            </div>

            <div className="mb-4 place-self-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
                    Generate
                </button>
            </div>
        </form>
    );
};

export default Form;
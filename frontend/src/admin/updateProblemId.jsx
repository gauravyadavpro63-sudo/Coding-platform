import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router";
import { UpdateProblemId,FetchProblemById } from "../api/problems";


// ============================================================
// ZOD SCHEMA
// ============================================================

const updateProblemSchema = z.object({

    title: z
        .string()
        .min(3, "Title must contain at least 3 characters"),

    description: z
        .string()
        .min(10, "Description must contain at least 10 characters"),

    difficulty: z
        .enum(["easy", "medium", "hard"]),

    tags: z
        .string()
        .min(1, "Tag is required"),

    visibleTestCases: z
        .array(
            z.object({
                input: z.string().min(1, "Input is required"),
                output: z.string().min(1, "Output is required"),
                explanation: z.string().min(1, "Explanation is required")
            })
        )
        .min(1, "At least one visible test case is required"),

    hiddenTestCases: z
        .array(
            z.object({
                input: z.string().min(1, "Input is required"),
                output: z.string().min(1, "Output is required")
            })
        )
        .min(1, "At least one hidden test case is required"),

    startCode: z
        .array(
            z.object({
                language: z.string().min(1, "Language is required"),
                initialCode: z.string().min(1, "Initial code is required")
            })
        )
        .min(1, "At least one start code is required"),

    referenceSolution: z
        .array(
            z.object({
                language: z.string().min(1, "Language is required"),
                completecode: z.string().min(1, "Complete code is required")
            })
        )
        .min(1, "At least one reference solution is required")
});


// ============================================================
// COMPONENT
// ============================================================

const UpdateProblem = () => {

    const { id } = useParams();

    const navigate = useNavigate();


    // ========================================================
    // REACT HOOK FORM
    // ========================================================

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(updateProblemSchema)
    });


    // ========================================================
    // FIELD ARRAYS
    // ========================================================

    const {
        fields: visibleFields,
        append: appendVisible,
        remove: removeVisible
    } = useFieldArray({
        control,
        name: "visibleTestCases"
    });


    const {
        fields: hiddenFields,
        append: appendHidden,
        remove: removeHidden
    } = useFieldArray({
        control,
        name: "hiddenTestCases"
    });


    const {
        fields: startCodeFields,
        append: appendStartCode,
        remove: removeStartCode
    } = useFieldArray({
        control,
        name: "startCode"
    });


    const {
        fields: referenceFields,
        append: appendReference,
        remove: removeReference
    } = useFieldArray({
        control,
        name: "referenceSolution"
    });


    // ========================================================
    // FETCH EXISTING PROBLEM
    // ========================================================

    useEffect(() => {

        const fetchProblem = async () => {

            try {

                const response = await FetchProblemById(id)
                

                const problem = response
                console.log("Fetched problem:", response);

                // Put existing problem into the form
                reset(problem);

            } catch (err) {

                console.log(err);
                alert("cant fetch problem")

            }

        };

        if (id) {
            fetchProblem();
        }

    }, [id, reset]);


    // ========================================================
    // UPDATE PROBLEM
    // ========================================================

    const onSubmit = async (data) => {

        try {

            const response = await UpdateProblemId(data,id)

            console.log("Updated problem:", response.data);

            alert("Problem updated successfully");

            navigate("/admin/update");

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Failed to update problem"
            );

        }

    };


    // ========================================================
    // UI
    // ========================================================

    return (

        <div className="min-h-screen bg-black text-white p-8">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    Update Problem
                </h1>


                <form
                    onSubmit={handleSubmit(onSubmit, (errors) => console.log("Validation errors:", errors))}
                    className="space-y-8"
                >


                    {/* ==================================================
                        BASIC INFORMATION
                    ================================================== */}

                    <div className="bg-[#111] border border-gray-800 rounded-xl p-6 space-y-5">

                        <h2 className="text-xl font-semibold">
                            Basic Information
                        </h2>


                        {/* TITLE */}

                        <div>

                            <label className="block mb-2">
                                Title
                            </label>

                            <input
                                {...register("title")}
                                className="w-full bg-black border border-gray-700 rounded-lg p-3 outline-none focus:border-white"
                            />

                            {errors.title && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.title.message}
                                </p>
                            )}

                        </div>


                        {/* DESCRIPTION */}

                        <div>

                            <label className="block mb-2">
                                Description
                            </label>

                            <textarea
                                {...register("description")}
                                rows={6}
                                className="w-full bg-black border border-gray-700 rounded-lg p-3 outline-none focus:border-white"
                            />

                            {errors.description && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.description.message}
                                </p>
                            )}

                        </div>


                        {/* DIFFICULTY */}

                        <div>

                            <label className="block mb-2">
                                Difficulty
                            </label>

                            <select
                                {...register("difficulty")}
                                className="w-full bg-black border border-gray-700 rounded-lg p-3"
                            >

                                <option value="easy">
                                    Easy
                                </option>

                                <option value="medium">
                                    Medium
                                </option>

                                <option value="hard">
                                    Hard
                                </option>

                            </select>

                            {errors.difficulty && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.difficulty.message}
                                </p>
                            )}

                        </div>


                        {/* TAG */}

                        <div>

                            <label className="block mb-2">
                                Tag
                            </label>

                            <input
                                {...register("tags")}
                                placeholder="array"
                                className="w-full bg-black border border-gray-700 rounded-lg p-3 outline-none focus:border-white"
                            />

                            {errors.tags && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.tags.message}
                                </p>
                            )}

                        </div>

                    </div>


                    {/* ==================================================
                        VISIBLE TEST CASES
                    ================================================== */}

                    <div className="bg-[#111] border border-gray-800 rounded-xl p-6">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-xl font-semibold">
                                Visible Test Cases
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    appendVisible({
                                        input: "",
                                        output: "",
                                        explanation: ""
                                    })
                                }
                                className="bg-white text-black px-4 py-2 rounded-lg"
                            >
                                + Add Test Case
                            </button>

                        </div>


                        <div className="space-y-6">

                            {visibleFields.map((field, index) => (

                                <div
                                    key={field.id}
                                    className="border border-gray-700 rounded-lg p-5 space-y-4"
                                >

                                    <div className="flex justify-between">

                                        <h3 className="font-medium">
                                            Test Case {index + 1}
                                        </h3>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeVisible(index)
                                            }
                                            className="text-red-400"
                                        >
                                            Remove
                                        </button>

                                    </div>


                                    <input
                                        {...register(
                                            `visibleTestCases.${index}.input`
                                        )}
                                        placeholder="Input"
                                        className="w-full bg-black border border-gray-700 rounded-lg p-3"
                                    />


                                    <input
                                        {...register(
                                            `visibleTestCases.${index}.output`
                                        )}
                                        placeholder="Output"
                                        className="w-full bg-black border border-gray-700 rounded-lg p-3"
                                    />


                                    <textarea
                                        {...register(
                                            `visibleTestCases.${index}.explanation`
                                        )}
                                        placeholder="Explanation"
                                        className="w-full bg-black border border-gray-700 rounded-lg p-3"
                                    />

                                </div>

                            ))}

                        </div>

                    </div>


                    {/* ==================================================
                        HIDDEN TEST CASES
                    ================================================== */}

                    <div className="bg-[#111] border border-gray-800 rounded-xl p-6">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-xl font-semibold">
                                Hidden Test Cases
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    appendHidden({
                                        input: "",
                                        output: ""
                                    })
                                }
                                className="bg-white text-black px-4 py-2 rounded-lg"
                            >
                                + Add Test Case
                            </button>

                        </div>


                        <div className="space-y-6">

                            {hiddenFields.map((field, index) => (

                                <div
                                    key={field.id}
                                    className="border border-gray-700 rounded-lg p-5 space-y-4"
                                >

                                    <div className="flex justify-between">

                                        <h3>
                                            Hidden Test Case {index + 1}
                                        </h3>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeHidden(index)
                                            }
                                            className="text-red-400"
                                        >
                                            Remove
                                        </button>

                                    </div>


                                    <input
                                        {...register(
                                            `hiddenTestCases.${index}.input`
                                        )}
                                        placeholder="Input"
                                        className="w-full bg-black border border-gray-700 rounded-lg p-3"
                                    />


                                    <input
                                        {...register(
                                            `hiddenTestCases.${index}.output`
                                        )}
                                        placeholder="Output"
                                        className="w-full bg-black border border-gray-700 rounded-lg p-3"
                                    />

                                </div>

                            ))}

                        </div>

                    </div>


                    {/* ==================================================
                        START CODE
                    ================================================== */}

                    <div className="bg-[#111] border border-gray-800 rounded-xl p-6">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-xl font-semibold">
                                Start Code
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    appendStartCode({
                                        language: "",
                                        initialCode: ""
                                    })
                                }
                                className="bg-white text-black px-4 py-2 rounded-lg"
                            >
                                + Add Language
                            </button>

                        </div>


                        <div className="space-y-6">

                            {startCodeFields.map((field, index) => (

                                <div
                                    key={field.id}
                                    className="border border-gray-700 rounded-lg p-5 space-y-4"
                                >

                                    <div className="flex justify-between">

                                        <h3>
                                            Language {index + 1}
                                        </h3>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeStartCode(index)
                                            }
                                            className="text-red-400"
                                        >
                                            Remove
                                        </button>

                                    </div>


                                    <input
                                        {...register(
                                            `startCode.${index}.language`
                                        )}
                                        placeholder="cpp"
                                        className="w-full bg-black border border-gray-700 rounded-lg p-3"
                                    />


                                    <textarea
                                        {...register(
                                            `startCode.${index}.initialCode`
                                        )}
                                        placeholder="Initial code"
                                        rows={8}
                                        className="w-full bg-black border border-gray-700 rounded-lg p-3 font-mono"
                                    />

                                </div>

                            ))}

                        </div>

                    </div>


                    {/* ==================================================
                        REFERENCE SOLUTION
                    ================================================== */}

                    <div className="bg-[#111] border border-gray-800 rounded-xl p-6">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-xl font-semibold">
                                Reference Solutions
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    appendReference({
                                        language: "",
                                        completecode: ""
                                    })
                                }
                                className="bg-white text-black px-4 py-2 rounded-lg"
                            >
                                + Add Solution
                            </button>

                        </div>


                        <div className="space-y-6">

                            {referenceFields.map((field, index) => (

                                <div
                                    key={field.id}
                                    className="border border-gray-700 rounded-lg p-5 space-y-4"
                                >

                                    <div className="flex justify-between">

                                        <h3>
                                            Solution {index + 1}
                                        </h3>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeReference(index)
                                            }
                                            className="text-red-400"
                                        >
                                            Remove
                                        </button>

                                    </div>


                                    <input
                                        {...register(
                                            `referenceSolution.${index}.language`
                                        )}
                                        placeholder="cpp"
                                        className="w-full bg-black border border-gray-700 rounded-lg p-3"
                                    />


                                    <textarea
                                        {...register(
                                            `referenceSolution.${index}.completecode`
                                        )}
                                        placeholder="Complete solution code"
                                        rows={12}
                                        className="w-full bg-black border border-gray-700 rounded-lg p-3 font-mono"
                                    />

                                </div>

                            ))}

                        </div>

                    </div>


                    {/* ==================================================
                        UPDATE BUTTON
                    ================================================== */}

                    <button
                        type="submit"
                        className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200"
                        
                    >
                        Update Problem
                    </button>

                </form>

            </div>

        </div>
    );
};

export default UpdateProblem;
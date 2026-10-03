import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { FetchCreateProblem } from "../api/problems";

// =========================
// ZOD SCHEMA
// =========================

const createProblemSchema = z.object({
  title: z
    .string()
    .min(3, "Title must contain at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must contain at least 10 characters"),

  difficulty: z.enum(["easy", "medium", "hard"]),

  tags: z.enum(["array", "linkedlist", "graph", "dp"]),

  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().min(1, "Explanation is required"),
    })
  ),

  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
    })
  ),

  startCode: z.array(
    z.object({
      language: z.enum(["cpp", "java", "javascript"]),
      initialCode: z.string().min(1, "Initial code is required"),
    })
  ),

  referenceSolution: z.array(
    z.object({
      language: z.enum(["cpp", "java", "javascript"]),
      completecode: z.string().min(1, "Reference solution is required"),
    })
  ),
});


// =========================
// COMPONENT
// =========================

function CreateProblem() {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProblemSchema),

    defaultValues: {
      title: "",
      description: "",
      difficulty: "easy",
      tags: "array",

      visibleTestCases: [
        {
          input: "",
          output: "",
          explanation: "",
        },
      ],

      hiddenTestCases: [
        {
          input: "",
          output: "",
        },
      ],

      startCode: [
        {
          language: "cpp",
          initialCode: "",
        },
        {
          language: "java",
          initialCode: "",
        },
        {
          language: "javascript",
          initialCode: "",
        },
      ],

      referenceSolution: [
        {
          language: "cpp",
          completecode: "",
        },
        {
          language: "java",
          completecode: "",
        },
        {
          language: "javascript",
          completecode: "",
        },
      ],
    },
  });


  // =========================
  // VISIBLE TEST CASES
  // =========================

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible,
  } = useFieldArray({
    control,
    name: "visibleTestCases",
  });


  // =========================
  // HIDDEN TEST CASES
  // =========================

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden,
  } = useFieldArray({
    control,
    name: "hiddenTestCases",
  });


  // =========================
  // SUBMIT
  // =========================

  const onSubmit = async (data) => {
    try {
      console.log(data);

      const response = await FetchCreateProblem(data);

   
      alert("Problem created successfully!");

      navigate("/admin");

    } catch (error) {
      console.log("FULL ERROR:", error);

    console.log("SERVER RESPONSE:", error.response?.data);
    console.log("STATUS:", error.response?.status);

    alert(error.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <div className="min-h-screen bg-black text-white p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Create Problem
        </h1>


        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >


          {/* ================= BASIC INFORMATION ================= */}

          <div className="border border-zinc-800 rounded-xl p-6">

            <h2 className="text-2xl font-semibold mb-6">
              Basic Information
            </h2>


            {/* TITLE */}

            <div className="mb-5">

              <label className="block mb-2">
                Problem Title
              </label>

              <input
                {...register("title")}
                placeholder="Enter problem title"
                className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-lg"
              />

              {errors.title && (
                <p className="text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}

            </div>


            {/* DESCRIPTION */}

            <div className="mb-5">

              <label className="block mb-2">
                Description
              </label>

              <textarea
                {...register("description")}
                placeholder="Enter problem description"
                rows={6}
                className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-lg"
              />

              {errors.description && (
                <p className="text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}

            </div>


            {/* DIFFICULTY */}

            <div className="mb-5">

              <label className="block mb-2">
                Difficulty
              </label>

              <select
                {...register("difficulty")}
                className="bg-zinc-900 border border-zinc-700 p-3 rounded-lg"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

            </div>


            {/* TAG */}

            <div>

              <label className="block mb-2">
                Tag
              </label>

              <select
                {...register("tags")}
                className="bg-zinc-900 border border-zinc-700 p-3 rounded-lg"
              >
                <option value="array">Array</option>
                <option value="linkedlist">Linked List</option>
                <option value="graph">Graph</option>
                <option value="dp">Dynamic Programming</option>
              </select>

            </div>

          </div>


          {/* ================= VISIBLE TEST CASES ================= */}

          <div className="border border-zinc-800 rounded-xl p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-semibold">
                Visible Test Cases
              </h2>

              <button
                type="button"
                onClick={() =>
                  appendVisible({
                    input: "",
                    output: "",
                    explanation: "",
                  })
                }
                className="btn btn-primary"
              >
                + Add Test Case
              </button>

            </div>


            {visibleFields.map((field, index) => (

              <div
                key={field.id}
                className="border border-zinc-700 rounded-lg p-5 mb-6"
              >

                <div className="flex justify-between items-center mb-4">

                  <h3 className="text-xl">
                    Test Case {index + 1}
                  </h3>

                  {visibleFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVisible(index)}
                      className="btn btn-error btn-sm"
                    >
                      Remove
                    </button>
                  )}

                </div>


                {/* INPUT */}

                <textarea
                  {...register(
                    `visibleTestCases.${index}.input`
                  )}
                  placeholder="Input"
                  rows={4}
                  className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-lg mb-2"
                />

                {errors.visibleTestCases?.[index]?.input && (
                  <p className="text-red-500 mb-3">
                    {errors.visibleTestCases[index].input.message}
                  </p>
                )}


                {/* OUTPUT */}

                <textarea
                  {...register(
                    `visibleTestCases.${index}.output`
                  )}
                  placeholder="Output"
                  rows={3}
                  className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-lg mb-2"
                />

                {errors.visibleTestCases?.[index]?.output && (
                  <p className="text-red-500 mb-3">
                    {errors.visibleTestCases[index].output.message}
                  </p>
                )}


                {/* EXPLANATION */}

                <textarea
                  {...register(
                    `visibleTestCases.${index}.explanation`
                  )}
                  placeholder="Explanation"
                  rows={4}
                  className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-lg"
                />

                {errors.visibleTestCases?.[index]?.explanation && (
                  <p className="text-red-500 mt-1">
                    {errors.visibleTestCases[index].explanation.message}
                  </p>
                )}

              </div>

            ))}

          </div>


          {/* ================= HIDDEN TEST CASES ================= */}

          <div className="border border-zinc-800 rounded-xl p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-semibold">
                Hidden Test Cases
              </h2>

              <button
                type="button"
                onClick={() =>
                  appendHidden({
                    input: "",
                    output: "",
                  })
                }
                className="btn btn-primary"
              >
                + Add Hidden Case
              </button>

            </div>


            {hiddenFields.map((field, index) => (

              <div
                key={field.id}
                className="border border-zinc-700 rounded-lg p-5 mb-6"
              >

                <div className="flex justify-between items-center mb-4">

                  <h3 className="text-xl">
                    Hidden Test Case {index + 1}
                  </h3>

                  {hiddenFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHidden(index)}
                      className="btn btn-error btn-sm"
                    >
                      Remove
                    </button>
                  )}

                </div>


                {/* INPUT */}

                <textarea
                  {...register(
                    `hiddenTestCases.${index}.input`
                  )}
                  placeholder="Input"
                  rows={4}
                  className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-lg mb-2"
                />

                {errors.hiddenTestCases?.[index]?.input && (
                  <p className="text-red-500 mb-3">
                    {errors.hiddenTestCases[index].input.message}
                  </p>
                )}


                {/* OUTPUT */}

                <textarea
                  {...register(
                    `hiddenTestCases.${index}.output`
                  )}
                  placeholder="Output"
                  rows={3}
                  className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-lg"
                />

                {errors.hiddenTestCases?.[index]?.output && (
                  <p className="text-red-500 mt-1">
                    {errors.hiddenTestCases[index].output.message}
                  </p>
                )}

              </div>

            ))}

          </div>


          {/* ================= START CODE ================= */}

          <div className="border border-zinc-800 rounded-xl p-6">

            <h2 className="text-2xl font-semibold mb-6">
              Starter Code
            </h2>


            {/* CPP */}

            <div className="mb-6">

              <h3 className="text-lg mb-2">
                C++
              </h3>

              <textarea
                {...register("startCode.0.initialCode")}
                rows={12}
                placeholder="Enter C++ starter code"
                className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-lg font-mono"
              />

              {errors.startCode?.[0]?.initialCode && (
                <p className="text-red-500 mt-1">
                  {errors.startCode[0].initialCode.message}
                </p>
              )}

            </div>


            {/* JAVA */}

            <div className="mb-6">

              <h3 className="text-lg mb-2">
                Java
              </h3>

              <textarea
                {...register("startCode.1.initialCode")}
                rows={12}
                placeholder="Enter Java starter code"
                className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-lg font-mono"
              />

              {errors.startCode?.[1]?.initialCode && (
                <p className="text-red-500 mt-1">
                  {errors.startCode[1].initialCode.message}
                </p>
              )}

            </div>


            {/* JAVASCRIPT */}

            <div>

              <h3 className="text-lg mb-2">
                JavaScript
              </h3>

              <textarea
                {...register("startCode.2.initialCode")}
                rows={12}
                placeholder="Enter JavaScript starter code"
                className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-lg font-mono"
              />

              {errors.startCode?.[2]?.initialCode && (
                <p className="text-red-500 mt-1">
                  {errors.startCode[2].initialCode.message}
                </p>
              )}

            </div>

          </div>


          {/* ================= REFERENCE SOLUTION ================= */}

          <div className="border border-zinc-800 rounded-xl p-6">

            <h2 className="text-2xl font-semibold mb-6">
              Reference Solution
            </h2>


            {/* CPP */}

            <div className="mb-6">

              <h3 className="text-lg mb-2">
                C++
              </h3>

              <textarea
                {...register(
                  "referenceSolution.0.completecode"
                )}
                rows={15}
                placeholder="Enter complete C++ solution"
                className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-lg font-mono"
              />

              {errors.referenceSolution?.[0]?.completecode && (
                <p className="text-red-500 mt-1">
                  {errors.referenceSolution[0].completecode.message}
                </p>
              )}

            </div>


            {/* JAVA */}

            <div className="mb-6">

              <h3 className="text-lg mb-2">
                Java
              </h3>

              <textarea
                {...register(
                  "referenceSolution.1.completecode"
                )}
                rows={15}
                placeholder="Enter complete Java solution"
                className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-lg font-mono"
              />

              {errors.referenceSolution?.[1]?.completecode && (
                <p className="text-red-500 mt-1">
                  {errors.referenceSolution[1].completecode.message}
                </p>
              )}

            </div>


            {/* JAVASCRIPT */}

            <div>

              <h3 className="text-lg mb-2">
                JavaScript
              </h3>

              <textarea
                {...register(
                  "referenceSolution.2.completecode"
                )}
                rows={15}
                placeholder="Enter complete JavaScript solution"
                className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-lg font-mono"
              />

              {errors.referenceSolution?.[2]?.completecode && (
                <p className="text-red-500 mt-1">
                  {errors.referenceSolution[2].completecode.message}
                </p>
              )}

            </div>

          </div>


          {/* ================= SUBMIT ================= */}

          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Create Problem
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateProblem;
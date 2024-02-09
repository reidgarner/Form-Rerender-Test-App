import { useEffect, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Formik } from 'formik';

function shadeSwitch(renderCount) {
  switch (true) {
    case renderCount < 1:
      return '';
    case renderCount < 3:
      return 'bg-red-50';
    case renderCount < 5:
      return 'bg-red-100';
    case renderCount < 7:
      return 'bg-red-200';
    case renderCount < 9:
      return 'bg-red-300';
    case renderCount < 11:
      return 'bg-red-400';
    case renderCount < 13:
      return 'bg-red-500';
    case renderCount < 15:
      return 'bg-red-600';
    case renderCount < 17:
      return 'bg-red-700';
    case renderCount < 19:
      return 'bg-red-800';
    case renderCount >= 19:
      return 'bg-red-900';
    default:
      return '';
  }
}


function ControlledInputsForm() {
  const renderCount = useRef(0);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      username: validateInput('username', formData.username),
      password: validateInput('password', formData.password),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const validateInput = (name, value) => {
    switch (name) {
      case 'username':
        return value.length < 5 ? 'Username must be at least 5 characters long' : '';
      case 'password':
        return value.length < 5 ? 'Password must be at least 5 characters long' : '';
      default:
        return '';
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      alert(`Username: ${formData.username}, Password: ${formData.password}`)
    }
  };

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  return (
    <div className="flex flex-col items-start justify-center px-8 py-6 space-y-4 border rounded-lg bg-neutral-50">
      <div>
        <h2 className="text-xl font-bold text-blue-500 underline">
          <a
            href="https://legacy.reactjs.org/docs/forms.html#controlled-components"
            target="_blank"
            rel="noopener noreferrer"
          >
            Controlled Inputs Form
          </a>
        </h2>
        <span className="text-sm text-muted-foreground">
          These inputs will cause rerenders on every keystroke
        </span>
      </div>
      <div className={`self-start px-2 py-0 ${shadeSwitch(renderCount.current)} ${!renderCount.current ? 'border' : 'border border-white'} rounded-md`}>
        <h3 className={`${renderCount.current < 11 ? 'text-neutral-800' : 'text-neutral-200'} text-md`}>
          Renders: {renderCount.current}
        </h3>
      </div>
      <label
        htmlFor="username"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Username
      </label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.name}
        onChange={handleChange}
        className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Username"
      />
      {errors.username && <p className="text-sm font-medium text-destructive">{errors.username}</p>}
      <label
        htmlFor="password"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Password
      </label>
      <input
        type="text"
        id="password"
        name="password"
        value={formData.name}
        onChange={handleChange}
        className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Password"
      />
      {errors.password && <p className="text-sm font-medium text-destructive">{errors.password}</p>}
      <button
        onClick={onSubmit}
        className="inline-flex items-center self-start justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Submit
      </button>
    </div>
  )
}

function UncontrolledInputsForm() {
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const renderCount = useRef(0);
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });


  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  const validateInput = (name, value) => {
    switch (name) {
      case 'username':
        return value.length < 5 ? false : true;
      case 'password':
        return value.length < 5 ? false : true;
      default:
        return true;
    }
  };

  const validateForm = () => {
    const isUserNameValid = validateInput('username', usernameInputRef.current.value);
    const isPasswordValid = validateInput('password', passwordInputRef.current.value);
    setErrors({
      username: isUserNameValid ? '' : 'Username must be at least 5 characters long',
      password: isPasswordValid ? '' : 'Password must be at least 5 characters long',
    });
    return isUserNameValid && isPasswordValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    console.log('Hello: ', isFormValid);
    if (isFormValid) {
      alert(`Username: ${usernameInputRef.current.value}, Password: ${passwordInputRef.current.value}`)
    }
  };

  return (
    <div className="flex flex-col items-start justify-center px-8 py-6 space-y-4 border rounded-lg bg-neutral-50">
      <div>
        <h2 className="text-xl font-bold text-blue-500 underline">
          <a
            href="https://legacy.reactjs.org/docs/uncontrolled-components.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Uncontrolled Inputs Form
          </a>
        </h2>
        <span className="text-sm text-muted-foreground">
          These inputs will not cause rerenders
        </span>
      </div>
      <div className={`self-start px-2 py-0 ${shadeSwitch(renderCount.current)} ${!renderCount.current ? 'border' : 'border border-white'} rounded-md`}>
        <h3 className={`${renderCount.current < 11 ? 'text-neutral-800' : 'text-neutral-200'} text-md`}>
          Renders: {renderCount.current}
        </h3>
      </div>
      <label
        htmlFor="username"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Username
      </label>
      <input
        type="text"
        id="username"
        name="username"
        ref={usernameInputRef}
        className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Username"
      />
      {errors.username && <p className="text-sm font-medium text-destructive">{errors.username}</p>}
      <label
        htmlFor="password"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Password
      </label>
      <input
        type="text"
        id="password"
        name="password"
        ref={passwordInputRef}
        className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Password"
      />
      {errors.password && <p className="text-sm font-medium text-destructive">{errors.password}</p>}
      <button
        onClick={onSubmit}
        className="inline-flex items-center self-start justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Submit
      </button>
    </div>
  )
}

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
})

function ShadcnForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  function onSubmit(values) {
    alert(`Username: ${values.username}, Password: ${values.password}`)
  }

  return (
    <div className="flex flex-col justify-center px-8 py-6 space-y-2 border rounded-lg bg-neutral-50">
      <Form {...form}>
        <div>
          <h2 className="text-xl font-bold">
            <a
              className="text-blue-500 underline"
              href="https://ui.shadcn.com/docs/components/form"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shadcn
            </a>
            <span> / </span>
            <a
              className="text-blue-500 underline"
              href="https://react-hook-form.com/get-started"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Hook Form
            </a>
          </h2>
          <span className="text-sm text-muted-foreground">
            These inputs will have minimum rerenders
          </span>
        </div>
        <div className={`self-start px-2 py-0 ${shadeSwitch(renderCount.current)} ${!renderCount.current ? 'border' : 'border border-white'} rounded-md`}>
          <h3 className={`${renderCount.current < 11 ? 'text-neutral-800' : 'text-neutral-200'} text-md`}>
            Renders: {renderCount.current}
          </h3>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

function FormikForm() {
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  function onSubmit(values) {
    alert(`Username: ${values.username}, Password: ${values.password}`)
  }

  return (
    <div className="flex flex-col justify-center px-8 py-6 space-y-2 border rounded-lg bg-neutral-50">
      <div>
        <h2 className="text-xl font-bold text-blue-500 underline">
          <a
            href="https://formik.org/docs/overview"
            target="_blank"
            rel="noopener noreferrer"
          >
            Formik
          </a>
        </h2>
        <span className="text-sm text-muted-foreground">
          These inputs will not cause rerenders
        </span>
      </div>
      <div className={`self-start px-2 py-0 ${shadeSwitch(renderCount.current)} ${!renderCount.current ? 'border' : 'border border-white'} rounded-md`}>
        <h3 className={`${renderCount.current < 11 ? 'text-neutral-800' : 'text-neutral-200'} text-md`}>
          Renders: {renderCount.current}
        </h3>
      </div>
      <Formik
        initialValues={{ username: '', password: '' }}
        validate={values => {
          const errors = {};
          if (values.username.length < 5) {
            errors.username = 'Username must be at least 5 characters long';
          }
          if (values.password.length < 5) {
            errors.password = 'Password must be at least 5 characters long';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            onSubmit(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          touched,
        }) => (
          <form
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="username"
              className="relative text-sm font-medium leading-none top-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username && <p className="text-sm font-medium text-destructive">{errors.username}</p>}
            <label
              htmlFor="password"
              className="relative text-sm font-medium leading-none top-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && <p className="text-sm font-medium text-destructive">{errors.password}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center self-start justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

function FormDataForm() {
  const renderCount = useRef(0);
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  const validateForm = (formData) => {
    const username = formData.get('username');
    const password = formData.get('password');
    const usernameError = username.length < 5 ? 'Username must be at least 5 characters long' : '';
    const passwordError = password.length < 5 ? 'Password must be at least 5 characters long' : '';
    return {
      username: usernameError,
      password: passwordError,
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    const username = formData.get('username');
    const password = formData.get('password');
    const isFormValid = Object.values(validationErrors).every((error) => !error);
    if (isFormValid) {
      alert(`Username: ${username}, Password: ${password}`);
    }
  };

  return (
    <div className="flex flex-col justify-center px-8 py-6 space-y-2 border rounded-lg bg-neutral-50">
      <div>
        <h2 className="text-xl font-bold text-blue-500 underline">
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData?ref=hackernoon.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            FormData()
          </a>
        </h2>
        <span className="text-sm text-muted-foreground">
          These inputs will not cause rerenders
        </span>
      </div>
      <div className={`self-start px-2 py-0 ${shadeSwitch(renderCount.current)} ${!renderCount.current ? 'border' : 'border border-white'} rounded-md`}>
        <h3 className={`${renderCount.current < 11 ? 'text-neutral-800' : 'text-neutral-200'} text-md`}>
          Renders: {renderCount.current}
        </h3>
      </div>
      <form
        className="space-y-4"
        onSubmit={onSubmit}
      >
        <label
          htmlFor="username"
          className="relative text-sm font-medium leading-none top-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {!!errors.username && <p className="text-sm font-medium text-destructive">{errors.username}</p>}
        <label
          htmlFor="password"
          className="relative text-sm font-medium leading-none top-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Password
        </label>
        <input
          type="text"
          id="password"
          name="password"
          className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {!!errors.password && <p className="text-sm font-medium text-destructive">{errors.password}</p>}
        <button
          type="submit"
          className="inline-flex items-center self-start justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Submit
        </button>
      </form>
    </div>

  )
}

export default function App() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">React Form Rerender Comparison Tool</h1>
        <p className="text-lg text-muted-foreground">
          This is a simple comparison of different ways to handle forms in React.
        </p>
        <p>To test:</p>
        <ul className="pl-4 list-disc">
          <li>Type at least 5 characters into each input and press submit</li>
          <li>See rerender score</li>
          <li>Refresh page</li>
          <li>Type less than 5 characters into each input and press submit</li>
          <li>See rerender score</li>
        </ul>
      </div>
      <ControlledInputsForm />
      <UncontrolledInputsForm />
      <ShadcnForm />
      <FormikForm />
      <FormDataForm />
    </div>
  )
}
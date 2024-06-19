import Swal from "sweetalert2";
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
const Newsletter = () => {
    const handleNews = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const newEmail = {email}
        // console.log(email);
        fetch('https://textpresso-server.vercel.app/subscription', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newEmail)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data?.insertedId) {
                    Swal.fire({
                        title: 'Subscription Success 🎉',
                        text: 'We are thrilled to have you join our community ❤',
                        icon: 'success',
                        confirmButtonText: 'close'
                    })
                    form.reset();
                }
            })
    }
    return (
        <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.3 }}
         className="container mx-auto my-10 text-center shadow-2xl w-auto py-10">


            <h1 className="text-4xl font-sedan  font-bold container mx-auto text-purple-900">Subscribe to our Newsletter</h1>
            <p className="text-xl text-gray-700 font-semibold py-5">Join our community of avid writers and enthusiasts! Subscribe to our newsletter for <br /> the latest insights, tips, and trends in the world of blogging. </p>

            <div className="py-10">
                <form onSubmit={handleNews}>
                    <div className="flex flex-col justify-center items-center">
                        <label className="block text-sm text-gray-500 dark:text-gray-300">Email Address</label>

                        <div className="relative flex items-center mt-2">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-3 text-gray-400 dark:text-gray-500">
                                    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </span>

                            <input type="email" name="email" placeholder="email@example.com" className="block  w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-l-2xl pl-11 pr-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                            <button type="submit" className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-600 rounded-r-2xl hover:bg-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-80">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </form>
            </div>


        </motion.div>
    );
};

export default Newsletter;
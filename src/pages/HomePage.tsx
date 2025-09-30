import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ShieldCheck, IndianRupee, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
const Nav = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <Home className="h-8 w-8 text-blue-600" />
          <span className="ml-3 text-2xl font-bold font-display">LeaseFlow</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Pricing</a>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  </header>
);
const Hero = () => (
  <section className="pt-32 pb-20 text-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-black">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-6xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white"
      >
        Modern Property Management, Reimagined for <span className="text-blue-600">India</span>.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300"
      >
        LeaseFlow provides landlords and tenants with a seamless, intuitive platform to manage properties, automate billing, and streamline communication.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10"
      >
        <Button size="lg" asChild>
          <Link to="/signup">Start for Free</Link>
        </Button>
      </motion.div>
    </div>
  </section>
);
const features = [
  { icon: Zap, title: "Automated Billing", description: "Generate monthly rent and utility bills automatically. Enter meter readings and let LeaseFlow handle the calculations." },
  { icon: Home, title: "Centralized Management", description: "Manage all your properties, units (flats), and tenants from a single, intuitive dashboard." },
  { icon: ShieldCheck, title: "Role-Based Access", description: "Secure, distinct interfaces for Landlords and Tenants, ensuring everyone sees only what they need to." },
  { icon: IndianRupee, title: "India-Ready", description: "Built with the Indian market in mind, from currency (INR) to tenant onboarding details like Aadhar." },
];
const Features = () => (
  <section id="features" className="py-24 bg-white dark:bg-gray-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Features</h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
          Everything you need to manage properties efficiently
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
const Pricing = () => (
  <section id="pricing" className="py-24 bg-gray-50 dark:bg-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Simple, transparent pricing</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Choose the plan that's right for you.</p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
        <Card className="border-2 border-blue-600 shadow-xl transform hover:scale-105 transition-transform duration-300">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Pro Plan</CardTitle>
            <p className="text-4xl font-bold mt-2">₹199 <span className="text-lg font-normal text-gray-500">/property/month</span></p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center"><ShieldCheck className="h-5 w-5 text-green-500 mr-2" /> Unlimited Units</li>
              <li className="flex items-center"><ShieldCheck className="h-5 w-5 text-green-500 mr-2" /> Automated Billing</li>
              <li className="flex items-center"><ShieldCheck className="h-5 w-5 text-green-500 mr-2" /> Tenant Management</li>
              <li className="flex items-center"><ShieldCheck className="h-5 w-5 text-green-500 mr-2" /> Maintenance Tracking</li>
              <li className="flex items-center"><ShieldCheck className="h-5 w-5 text-green-500 mr-2" /> Email Support</li>
            </ul>
            <Button className="w-full mt-6" size="lg">Get Started</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);
const Footer = () => (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
      <p>&copy; {new Date().getFullYear()} LeaseFlow. All rights reserved.</p>
      <p className="mt-2 text-sm text-gray-400">Built with ❤️ at Cloudflare</p>
    </div>
  </footer>
);
export function HomePage() {
  return (
    <div className="bg-white dark:bg-black">
      <Nav />
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Gift, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !password) {
      toast.error('Please fill all required fields');
      return;
    }
    
    if (!agreeTerms) {
      toast.error('You must agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await signup(`${firstName} ${lastName}`, email, password);
      
      if (success) {
        navigate('/');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleGoogleSignup = async () => {
    setIsSubmitting(true);
    
    try {
      const success = await googleLogin();
      
      if (success) {
        navigate('/');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Link to="/" className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900">
        <ArrowLeft className="mr-2" size={18} />
        Back to menu
      </Link>
      
      <Card className="max-w-md mx-auto border-emerald-100 dark:border-emerald-800 dark:bg-gray-800">
        <CardHeader className="space-y-1 text-center pb-0">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-700/30 rounded-full flex items-center justify-center mx-auto mb-2">
            <Gift className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold dark:text-white">Create an Account</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Join our loyalty program and earn points with every order</p>
        </CardHeader>
        
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="dark:text-gray-200">First Name</Label>
                <Input 
                  id="firstName" 
                  placeholder="John" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="dark:text-gray-200">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Doe" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                className="dark:border-gray-500"
              />
              <Label htmlFor="terms" className="text-sm dark:text-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              onClick={handleGoogleSignup}
              disabled={isSubmitting}
            >
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6,20H24v8h11.3c-1.1,5.2-5.5,8-11.3,8c-6.6,0-12-5.4-12-12s5.4-12,12-12c3.1,0,5.8,1.2,8,3.1 l6.2-6.2C33.8,4.5,29.1,2,24,2C12.9,2,4,11,4,22s8.9,20,20,20s20-9,20-20C44,21.3,43.9,20.6,43.6,20z"></path>
                <path fill="#FF3D00" d="M6.3,13.2l7.2,5.3C15.3,13.9,19.4,11,24,11c3.1,0,5.8,1.2,8,3.1l6.2-6.2C33.8,4.5,29.1,2,24,2 C16.1,2,9.2,6.6,6.3,13.2z"></path>
                <path fill="#4CAF50" d="M24,44c5.1,0,9.8-2.4,12.9-6.4l-6.7-5.4c-2,1.8-4.6,2.8-7.2,2.8c-5.8,0-10.6-3.8-12.3-9h-7v5.5 C6.7,38.6,14.5,44,24,44z"></path>
                <path fill="#1976D2" d="M12,24c0-1.3,0.2-2.6,0.6-3.8h-7V26h7C12.2,25.4,12,24.7,12,24z"></path>
              </svg>
              Sign up with Google
            </Button>
          </CardContent>
        </form>
        
        <CardFooter className="flex flex-col pt-0">
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
              Log in
            </Link>
          </p>
          
          <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
            <div className="flex items-start">
              <div className="bg-emerald-100 dark:bg-emerald-700/50 rounded-full p-2 mr-3 text-emerald-600 dark:text-emerald-400">
                <Gift size={16} />
              </div>
              <div>
                <h4 className="font-medium dark:text-white">Loyalty Program Benefits</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 mt-1 space-y-1">
                  <li className="flex items-center">
                    <span className="bg-emerald-200 dark:bg-emerald-500 rounded-full h-1.5 w-1.5 mr-2"></span>
                    Earn 1 point for every $1 spent
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-200 dark:bg-emerald-500 rounded-full h-1.5 w-1.5 mr-2"></span>
                    Get $10 off when you reach 100 points
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-200 dark:bg-emerald-500 rounded-full h-1.5 w-1.5 mr-2"></span>
                    Exclusive offers and early access
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;

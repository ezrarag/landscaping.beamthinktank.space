# BEAM Landscaping Website

A modern, full-stack website for BEAM Landscaping, featuring community landscaping projects, volunteer management, donations, and project showcases.

## 🌟 Features

- **City Selector**: Choose your city for localized landscaping services
- **Before/After Gallery**: Showcase landscaping transformations with interactive modals
- **Project Management**: Track current and completed landscaping projects
- **Volunteer Signup**: Comprehensive volunteer registration system
- **Donation System**: Secure Stripe-powered donation processing
- **Responsive Design**: Mobile-first design with smooth animations
- **Supabase Integration**: Real-time database for projects, volunteers, and donations
- **Stripe Payments**: Secure payment processing for donations

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd landscaping.beamthinktank.space
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase Database**
   
   Create the following tables in your Supabase project:

   ```sql
   -- Projects table
   CREATE TABLE projects (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     location TEXT NOT NULL,
     status TEXT NOT NULL CHECK (status IN ('planning', 'active', 'completed')),
     progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
     target_date DATE NOT NULL,
     volunteers_needed INTEGER DEFAULT 0,
     current_volunteers INTEGER DEFAULT 0,
     before_image TEXT,
     after_image TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Volunteers table
   CREATE TABLE volunteers (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     first_name TEXT NOT NULL,
     last_name TEXT NOT NULL,
     email TEXT NOT NULL UNIQUE,
     phone TEXT,
     city TEXT NOT NULL,
     interests TEXT[] NOT NULL,
     availability TEXT[] NOT NULL,
     experience TEXT NOT NULL,
     message TEXT,
     status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Donations table
   CREATE TABLE donations (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     amount DECIMAL(10,2) NOT NULL,
     frequency TEXT NOT NULL CHECK (frequency IN ('one-time', 'monthly')),
     project_id TEXT,
     first_name TEXT NOT NULL,
     last_name TEXT NOT NULL,
     email TEXT NOT NULL,
     message TEXT,
     stripe_payment_intent_id TEXT NOT NULL UNIQUE,
     status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Service Requests table
   CREATE TABLE service_requests (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     first_name TEXT NOT NULL,
     last_name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT NOT NULL,
     city TEXT NOT NULL,
     project_type TEXT NOT NULL,
     description TEXT NOT NULL,
     timeline TEXT NOT NULL,
     budget_range TEXT NOT NULL,
     status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'approved', 'rejected')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Set up Stripe**
   
   - Create a Stripe account
   - Get your API keys from the Stripe dashboard
   - Set up webhook endpoints pointing to `/api/webhooks/stripe`
   - Configure webhook events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `invoice.payment_succeeded`, `invoice.payment_failed`

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── donations/     # Donation API
│   │   ├── volunteers/    # Volunteer API
│   │   ├── projects/      # Projects API
│   │   └── webhooks/      # Stripe webhooks
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/             # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── CitySelector.tsx   # City selection component
│   ├── BeforeAfterGallery.tsx # Before/after photo gallery
│   ├── ProjectHighlights.tsx  # Project showcase
│   ├── VolunteerSignup.tsx    # Volunteer registration
│   └── DonationSection.tsx    # Donation form
├── lib/                    # Utility libraries
│   ├── supabase.ts        # Supabase client
│   └── stripe.ts          # Stripe configuration
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Get your project URL and anon key
3. Create the database tables using the SQL above
4. Set up Row Level Security (RLS) policies as needed

### Stripe Setup
1. Create a Stripe account
2. Get your publishable and secret keys
3. Set up webhook endpoints
4. Test the payment flow in test mode

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 Features in Detail

### City Selector
- Dropdown with major US cities
- Search functionality
- Popular cities quick selection
- Responsive design for mobile

### Before/After Gallery
- Interactive image comparison
- Modal view with navigation
- Project details and descriptions
- Smooth animations and transitions

### Project Management
- Real-time project status tracking
- Progress bars and volunteer counts
- Filter by location and status
- Detailed project information

### Volunteer System
- Comprehensive signup form
- Interest and availability selection
- Experience level assessment
- City-based project matching

### Donation Processing
- Secure Stripe integration
- One-time and recurring donations
- Project-specific designation
- Email receipts and confirmations

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
- Primary colors (green theme)
- Earth tones for landscaping aesthetic
- Custom color palette support

### Content
- Update city list in `app/page.tsx`
- Modify project data in components
- Customize form fields and validation
- Add new sections as needed

## 🔒 Security

- Environment variables for sensitive data
- Supabase RLS policies
- Stripe webhook signature verification
- Form validation and sanitization
- HTTPS enforcement in production

## 📊 Analytics & Monitoring

- Stripe dashboard for payment analytics
- Supabase dashboard for database insights
- Vercel analytics for performance monitoring
- Error tracking and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- User authentication and profiles
- Project progress tracking
- Volunteer scheduling system
- Mobile app development
- Advanced analytics dashboard
- Multi-language support
- Integration with mapping services

---

Built with ❤️ for BEAM Landscaping and community development.

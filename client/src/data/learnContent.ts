export interface LearnTopic {
  id: number;
  title: string;
  description: string;
  icon: string;
  action: string;
  actionLabel: string;
  content?: string;
}

export interface VideoStory {
  id: number;
  title: string;
  thumbnailUrl: string;
  duration: string;
  description: string;
  studentName: string;
  university: string;
}

// Educational content for GF 101 section
export const learnTopics: LearnTopic[] = [
  {
    id: 1,
    title: "What is Celiac Disease?",
    description: "An autoimmune disorder where gluten damages the small intestine.",
    icon: "science",
    action: "learn-more",
    actionLabel: "Learn more",
    content: `
      <h2>Understanding Celiac Disease</h2>
      
      <p>Celiac disease is an autoimmune disorder that affects about 1% of the population. When people with celiac disease consume gluten (a protein found in wheat, barley, and rye), their immune system responds by attacking the small intestine.</p>
      
      <p>These attacks damage the villi, small finger-like projections lining the small intestine that help absorb nutrients. When the villi are damaged, the body cannot absorb nutrients properly, which can lead to malnutrition and other serious health problems.</p>
      
      <h3>Symptoms</h3>
      <ul>
        <li>Digestive issues: diarrhea, bloating, gas, abdominal pain</li>
        <li>Fatigue and weakness</li>
        <li>Unexpected weight loss</li>
        <li>Skin rashes (dermatitis herpetiformis)</li>
        <li>Anemia</li>
        <li>Headaches or brain fog</li>
        <li>Joint pain</li>
        <li>Mood changes, including anxiety and depression</li>
      </ul>
      
      <h3>Diagnosis</h3>
      <p>Celiac disease is diagnosed through blood tests that look for certain antibodies, followed by an intestinal biopsy to check for damage to the villi.</p>
      
      <h3>Treatment</h3>
      <p>The only treatment for celiac disease is a strict gluten-free diet. This means avoiding all foods and products containing wheat, barley, and rye. Even small amounts of gluten can trigger symptoms and cause intestinal damage.</p>
    `
  },
  {
    id: 2,
    title: "Hidden Gluten Checklist",
    description: "Surprising places gluten might be hiding in your food.",
    icon: "checklist",
    action: "see-checklist",
    actionLabel: "See checklist",
    content: `
      <h2>Hidden Sources of Gluten</h2>
      
      <p>Gluten can be hiding in many processed foods and products. Always read labels carefully and look for "certified gluten-free" labels when possible.</p>
      
      <h3>Common Hidden Sources:</h3>
      <ul>
        <li>Soy sauce (contains wheat)</li>
        <li>Salad dressings and marinades</li>
        <li>Processed meats (sausages, hot dogs, deli meats)</li>
        <li>Imitation seafood</li>
        <li>Broths and bouillon cubes</li>
        <li>Pre-seasoned rice mixes</li>
        <li>Flavored chips and snacks</li>
        <li>Candy and chocolate (may contain malt)</li>
        <li>Beer and malt beverages</li>
        <li>Some medications and supplements</li>
        <li>Toothpaste and mouthwash</li>
        <li>Playdough (if you handle it)</li>
        <li>Envelope and stamp adhesive</li>
        <li>Cosmetics and lip products</li>
      </ul>
      
      <h3>Terms That May Indicate Gluten:</h3>
      <ul>
        <li>Malt/malt flavoring/malt extract</li>
        <li>Modified food starch (if not specified as corn)</li>
        <li>Hydrolyzed vegetable protein (HVP)</li>
        <li>Textured vegetable protein (TVP)</li>
        <li>Seitan (wheat gluten)</li>
        <li>Wheat starch</li>
        <li>Wheat protein/hydrolyzed wheat protein</li>
        <li>Barley</li>
        <li>Rye</li>
        <li>Triticale</li>
        <li>Farina</li>
        <li>Graham flour</li>
        <li>Semolina</li>
        <li>Spelt</li>
      </ul>
    `
  },
  {
    id: 3,
    title: "Eating Out Tips",
    description: "How to safely navigate restaurants and campus dining.",
    icon: "restaurant",
    action: "read-tips",
    actionLabel: "Read tips",
    content: `
      <h2>Tips for Eating Out Safely</h2>
      
      <h3>Before You Go</h3>
      <ul>
        <li>Research restaurants online—many have gluten-free menus or allergy information available.</li>
        <li>Call ahead during non-peak hours to discuss your needs with the manager or chef.</li>
        <li>Check gluten-free apps like Find Me Gluten Free for reviews from other celiac diners.</li>
        <li>Eat something small before going out, so you're not starving if options are limited.</li>
      </ul>
      
      <h3>At the Restaurant</h3>
      <ul>
        <li>Inform your server about your celiac disease (not just a preference).</li>
        <li>Ask detailed questions about ingredients and preparation methods.</li>
        <li>Request that your food be prepared with clean utensils and surfaces.</li>
        <li>Avoid fried foods unless there's a dedicated fryer for gluten-free items.</li>
        <li>Be cautious with sauces and dressings—ask for them on the side or opt for simple options like oil and vinegar.</li>
        <li>When in doubt, choose simpler dishes with fewer ingredients.</li>
      </ul>
      
      <h3>Campus Dining Strategies</h3>
      <ul>
        <li>Meet with dining services or nutritionists at the beginning of the semester.</li>
        <li>Ask if there are designated gluten-free preparation areas.</li>
        <li>Find out which dining halls have the best gluten-free options.</li>
        <li>Get to know the staff who prepare your food regularly.</li>
        <li>Consider a meal plan exemption if safe options are limited.</li>
        <li>Keep a stash of safe snacks in your dorm or backpack.</li>
      </ul>
      
      <h3>Safe Campus Dining Options</h3>
      <ul>
        <li>Salad bars (but avoid croutons and prepared salads)</li>
        <li>Plain grilled meats and vegetables</li>
        <li>Baked potatoes</li>
        <li>Rice bowls (if made with gluten-free ingredients)</li>
        <li>Omelette stations (if they use clean equipment)</li>
        <li>Yogurt parfait bars (with fruit and certified GF granola)</li>
      </ul>
    `
  },
  {
    id: 4,
    title: "Supermarket Survival Guide",
    description: "Finding affordable gluten-free options at local stores.",
    icon: "shopping_cart",
    action: "get-guide",
    actionLabel: "Get the guide",
    content: `
      <h2>Gluten-Free Shopping on a Student Budget</h2>
      
      <h3>Naturally Gluten-Free Foods</h3>
      <p>Focus on these affordable naturally gluten-free foods:</p>
      <ul>
        <li>Rice (brown, white, wild)</li>
        <li>Potatoes and sweet potatoes</li>
        <li>Corn and corn tortillas (check labels)</li>
        <li>Beans and lentils</li>
        <li>Fresh fruits and vegetables</li>
        <li>Plain meat, fish, and poultry</li>
        <li>Eggs</li>
        <li>Milk and many cheeses</li>
        <li>Nuts and seeds</li>
        <li>Oils and vinegars</li>
      </ul>
      
      <h3>Budget-Friendly Gluten-Free Brands</h3>
      <ul>
        <li>Store brands (many major chains now have their own GF lines)</li>
        <li>Rice Chex and other Chex cereals</li>
        <li>Corn tortillas (Mission, La Tortilla Factory)</li>
        <li>Thai Kitchen rice noodles</li>
        <li>Lundberg rice products</li>
        <li>Bob's Red Mill (especially their oats and flours)</li>
        <li>Ancient Harvest quinoa products</li>
      </ul>
      
      <h3>Money-Saving Tips</h3>
      <ul>
        <li>Buy in bulk when possible—rice, beans, and GF flours can be much cheaper.</li>
        <li>Check for student discounts at local grocery stores.</li>
        <li>Shop sales and use digital coupons.</li>
        <li>Consider online subscription services for regularly used items.</li>
        <li>Split the cost of bulk items with gluten-free friends.</li>
        <li>Focus on whole foods rather than processed GF alternatives.</li>
        <li>Freeze bread and other perishable GF items to extend shelf life.</li>
      </ul>
      
      <h3>Campus-Friendly Gluten-Free Snacks</h3>
      <ul>
        <li>Rice cakes with nut butter</li>
        <li>Popcorn (plain, unflavored)</li>
        <li>Corn chips and salsa</li>
        <li>Cheese sticks</li>
        <li>Fresh fruit</li>
        <li>Yogurt</li>
        <li>Nuts and seeds</li>
        <li>GF protein bars (Kind, LÄRABAR, RX Bar)</li>
      </ul>
    `
  }
];

// Video stories content
export const videoStories: VideoStory[] = [
  {
    id: 1,
    title: "My First Year with Celiac",
    thumbnailUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=320&h=180&fit=crop",
    duration: "3:45",
    description: "Sarah shares her experience navigating college dining halls and social events during her freshman year after being diagnosed with celiac disease.",
    studentName: "Sarah J.",
    university: "University of Michigan"
  },
  {
    id: 2,
    title: "Dorm Cooking Hacks",
    thumbnailUrl: "https://images.unsplash.com/photo-1541855492-581f618f69a0?w=320&h=180&fit=crop",
    duration: "5:12",
    description: "Engineering student Mike demonstrates his creative solutions for preparing safe gluten-free meals with minimal equipment in a small dorm room.",
    studentName: "Mike T.",
    university: "Georgia Tech"
  },
  {
    id: 3,
    title: "Finding My Celiac Community",
    thumbnailUrl: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=320&h=180&fit=crop",
    duration: "4:30",
    description: "Jess talks about how joining a campus support group helped her overcome feelings of isolation after her celiac diagnosis during sophomore year.",
    studentName: "Jessica W.",
    university: "UCLA"
  },
  {
    id: 4,
    title: "Traveling Abroad with Celiac",
    thumbnailUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=320&h=180&fit=crop",
    duration: "6:15",
    description: "International studies major Alex shares tips and challenges from their semester abroad while maintaining a strict gluten-free diet.",
    studentName: "Alex P.",
    university: "NYU"
  }
];

// Function to simulate fetching topic data
export async function getLearnTopics(): Promise<LearnTopic[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(learnTopics);
    }, 500);
  });
}

// Function to simulate fetching video data
export async function getVideoStories(): Promise<VideoStory[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(videoStories);
    }, 500);
  });
}

// Function to get a specific topic by ID
export async function getTopicById(id: number): Promise<LearnTopic | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const topic = learnTopics.find(t => t.id === id);
      resolve(topic);
    }, 500);
  });
}

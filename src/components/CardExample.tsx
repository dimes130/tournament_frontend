import React from 'react';
import Card from './Card';

const CardExample: React.FC = () => {
  return (
    <div className="p-8 space-y-6 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Card Component Examples</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Card */}
        <Card
          title="Basic Card"
          subtitle="A simple card example"
          className="w-full"
        >
          <p>This is a basic card with title, subtitle, and content. The card has rounded corners and a clean design.</p>
        </Card>

        {/* Card with Image */}
        <Card
          title="Card with Image"
          subtitle="Features an image at the top"
          image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop"
          imageAlt="Laptop on desk"
          className="w-full"
        >
          <p>This card includes an image that displays beautifully at the top with rounded corners.</p>
        </Card>

        {/* Interactive Card */}
        <Card
          title="Interactive Card"
          subtitle="Click me!"
          className="w-full"
          onClick={() => alert('Card clicked!')}
          shadow="lg"
        >
          <p>This card is clickable and has hover effects. Try clicking on it!</p>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary btn-sm">Action</button>
          </div>
        </Card>

        {/* Bordered Card */}
        <Card
          title="Bordered Card"
          subtitle="With a beautiful border"
          variant="bordered"
          className="w-full"
        >
          <p>This card uses the bordered variant for a different visual style.</p>
        </Card>

        {/* Glass Card */}
        <Card
          title="Glass Card"
          subtitle="Glassmorphism effect"
          variant="glass"
          className="w-full"
        >
          <p>This card has a glass effect for a modern, translucent appearance.</p>
        </Card>

        {/* Disabled Card */}
        <Card
          title="Disabled Card"
          subtitle="Cannot be interacted with"
          disabled={true}
          onClick={() => alert('This should not fire')}
          className="w-full"
        >
          <p>This card is disabled and shows the disabled state styling.</p>
        </Card>
      </div>

      {/* Wide Card Example */}
      <div className="mt-8">
        <Card
          title="Wide Rectangle Card"
          subtitle="This demonstrates the long rectangle format"
          className="w-full"
          shadow="xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Feature 1</h3>
              <p>Description of the first feature in this wide card layout.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Feature 2</h3>
              <p>Description of the second feature in this wide card layout.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Feature 3</h3>
              <p>Description of the third feature in this wide card layout.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CardExample;
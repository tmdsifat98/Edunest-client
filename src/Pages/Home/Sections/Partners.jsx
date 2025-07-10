import React from "react";

const partners = [
  {
    name: "P Hero",
    logo: "https://imgs.search.brave.com/CSFUYDXOV2Una75qiXzXFOkviFTbT9sgyxdYw1fioRg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/MS53ZWJjYXRhbG9n/LmlvL2NhdGFsb2cv/cHJvZ3JhbW1pbmct/aGVyby9wcm9ncmFt/bWluZy1oZXJvLWlj/b24tZmlsbGVkLTI1/Ni5wbmc_dj0xNzE0/NzgwOTA3NTg2",
    description: "Learners with industry-level certifications in programming",
  },
  {
    name: "Biddabari IT",
    logo: "https://biddabari.com/frontend/assets/images/logo/biddabari-logo-v5.png",
    description: "Set off on the adventure and enjoy unwavering hospitality.",
  },
  {
    name: "Designify",
    logo: "https://imgs.search.brave.com/wktku7f13GhAeX4vFixZnvGyiCu6dNs7Xv1-qz9fE3M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5kZXNpZ25ydXNo/LmNvbS9hZ2VuY3lf/cGhvdG9zX2FuZF92/aWRlb3MvNDkwMzUx/L2NvbnZlcnNpb25z/L2xvZ28tbW9ja3Vw/LXRodW1iLmpwZw",
    description: "Creative design partnership for real-world projects.",
  },
  {
    name: "CodeHub",
    logo: "https://imgs.search.brave.com/YSuD-m4xxN_F13rFV5kqLPpzDoppWnuEhXM0BeowVS8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXQtcmVzaXplZC5l/bnZhdG91c2VyY29u/dGVudC5jb20vcHJl/dmlld3MvZmlsZXMv/NDAwMzM2NzE5L3By/ZXZpZXctaW1hZ2Uu/anBnP3c9NTkwJmg9/NTkwJmNmX2ZpdD1j/cm9wJmNyb3A9dG9w/JmZvcm1hdD1hdXRv/JnE9ODUmcz1mYTY0/ODY4NjViNDkwMDE3/NDFjYWMzZjEwYTlh/NDhhN2E3ZjE3Zjkx/NTI1YzhkYTM2YWMx/YWFiOWYwNmU0M2Ew",
    description: "Providing access to open source coding communities.",
  },
  {
    name: "10 MS",
    logo: "https://imgs.search.brave.com/wFNTdEhQpTHcj-qN4ox8qN6-g61E_nYSqo5YKZzleF8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dGhlb3JnLmNvbS82/N2Q2NWViYi0wN2Nk/LTRhOWMtYWVlYi00/OGJhNjVjZmZiZWZf/dGh1bWIuanBn",
    description: "Collaborating to offer future webdev worldwide.",
  },
  
];

const Partners = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-10 text-primary">Our Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="mx-auto h-20 w-20 object-cover mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;

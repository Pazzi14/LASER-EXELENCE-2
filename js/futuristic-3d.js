// Salve este arquivo como js/futuristic-3d.js

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hero-3d-background');
    if (!container) return;

    // 1. Inicialização do Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Cor de fundo do azul-profundo, mas a opacidade alpha=true permite o background-color do CSS
    renderer.setClearColor(0x004c6d, 0.5); 

    // 2. Criação da Geometria (Pontos/Grid)
    const particleCount = 2000;
    const particles = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
        // Posição aleatória em um cubo maior
        positions.push((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100);
        
        // Cores (gradiente sutil entre azul e verde menta)
        color.setHSL(Math.random() * 0.1 + 0.55, 0.8, 0.5); 
        colors.push(color.r, color.g, color.b);
    }

    particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Material
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.3,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 5;

    // 3. Função de Animação (Loop)
    const animate = () => {
        requestAnimationFrame(animate);

        // Movimento da câmera/sistema de partículas
        const time = Date.now() * 0.0001;
        particleSystem.rotation.x = time * 0.25;
        particleSystem.rotation.y = time * 0.5;

        renderer.render(scene, camera);
    };

    animate();
});

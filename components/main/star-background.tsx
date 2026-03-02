"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

// Paletas de cores para os pontos da malha
// Dica: Se quiser que a malha combine perfeitamente com o fundo vermelho e branco, 
// você pode alterar esses hexadecimais para tons de vermelho, vinho e pêssego.
const DARK_PALETTE = ["#9ecbff", "#5fb4ff", "#2b8eff", "#1a73e8", "#1572a1", "#00a7a7", "#009688", "#33cccc", "#7dd3fc"];
const LIGHT_PALETTE = ["#0f172a", "#1e293b", "#334155", "#0369a1", "#1d4ed8", "#000000"];

interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
}

const FineMeshBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return; // Ensure context is available

        let width = canvas.clientWidth;
        let height = canvas.clientHeight;
        let animationId: number = 0;

        const currentTheme = theme === 'system' ? resolvedTheme : theme;
        const isDark = currentTheme === 'dark';
        const activePalette = isDark ? DARK_PALETTE : LIGHT_PALETTE;

        const applyDPR = () => {
            const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        applyDPR();

        // Configurações da malha
        const numPoints = 60; // Quantidade ajustada para uma malha super fina e equilibrada
        const maxDistance = 150; // Distância máxima para conectar os pontos
        const points: Point[] = [];

        // Criação inicial dos pontos
        for (let i = 0; i < numPoints; i++) {
            points.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4, // Velocidade horizontal suave
                vy: (Math.random() - 0.5) * 0.4, // Velocidade vertical suave
                color: activePalette[Math.floor(Math.random() * activePalette.length)],
            });
        }

        const draw = () => {
            // Limpa o canvas a cada frame (fundo transparente para revelar a imagem)
            ctx.clearRect(0, 0, width, height);

            // Atualiza e desenha os pontos
            for (let i = 0; i < numPoints; i++) {
                const point = points[i];

                // Move o ponto
                point.x += point.vx;
                point.y += point.vy;

                // Rebate nas bordas da tela
                if (point.x < 0 || point.x > width) point.vx *= -1;
                if (point.y < 0 || point.y > height) point.vy *= -1;

                // Desenha o ponto
                ctx.beginPath();
                ctx.arc(point.x, point.y, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = point.color;
                ctx.fill();

                // Desenha as linhas de conexão (a malha)
                for (let j = i + 1; j < numPoints; j++) {
                    const otherPoint = points[j];
                    const dx = otherPoint.x - point.x;
                    const dy = otherPoint.y - point.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(otherPoint.x, otherPoint.y);
                        ctx.strokeStyle = point.color;

                        // Corrige a inconsistência de opacidade: usa globalAlpha para um fade real
                        ctx.globalAlpha = 1 - distance / maxDistance;
                        ctx.lineWidth = 0.5; // Espessura fixa e super fina
                        ctx.stroke();

                        // Reseta o alpha para não afetar os próximos desenhos
                        ctx.globalAlpha = 1.0;
                    }
                }
            }

            animationId = requestAnimationFrame(draw);
        };

        draw();

        const onResize = () => {
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            applyDPR();
        };

        const ro = new ResizeObserver(onResize);
        ro.observe(canvas);

        return () => {
            cancelAnimationFrame(animationId);
            ro.disconnect();
        };
    }, [theme, resolvedTheme, mounted]);

    if (!mounted) {
        // Fundo de fallback durante a hidratação do SSR
        return <div className="fixed inset-0 z-0 bg-[#030014]" />;
    }

    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none transition-colors duration-500"
            style={{
                backgroundImage: "url('/assets/cervant-os.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            {/* Camada sutil para garantir legibilidade de componentes e da malha sobre o wallpaper claro */}
            <div className="absolute inset-0 bg-white/10 dark:bg-black/40 transition-colors duration-500" />

            {/* Canvas da malha rodando sobre a imagem */}
            <canvas ref={canvasRef} className="w-full h-full relative z-10" style={{ imageRendering: "auto" }} />
        </div>
    );
};

export const StarsCanvas = FineMeshBackground;
export default FineMeshBackground;
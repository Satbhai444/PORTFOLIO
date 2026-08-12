import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Folder, Star, GitFork, Code, GitCommit, ExternalLink, X } from 'lucide-react';
import './GitHubStats.css';

const GITHUB_USERNAME = 'Satbhai444';
const WINDECK_REPO = 'WINDECK';

const FALLBACK_STATS = {
    publicRepos: 11,
    totalStars: 10,
    totalForks: 2,
    languages: ['HTML', 'Dart', 'JavaScript', 'CSS', 'C#', 'GLSL'],
    profileUrl: 'https://github.com/Satbhai444'
};

const GitHubStats = () => {
    const [stats, setStats] = useState(FALLBACK_STATS);
    const [commits, setCommits] = useState([]);
    const [showCommits, setShowCommits] = useState(false);
    const [commitsLoading, setCommitsLoading] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                const [userRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`)
                ]);

                if (!userRes.ok || !reposRes.ok) return;

                const user = await userRes.json();
                const reposData = await reposRes.json();
                const repos = Array.isArray(reposData) ? reposData : [];

                if (repos.length === 0) return;

                const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
                const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
                setStats({
                    publicRepos: user.public_repos || repos.length,
                    totalStars,
                    totalForks,
                    languages: ['HTML', 'Dart', 'JavaScript', 'CSS', 'C#', 'GLSL'],
                    profileUrl: user.html_url
                });
            } catch (err) {
                console.error('GitHub API error:', err);
            }
        };

        fetchGitHubData();
    }, []);

    const fetchCommits = async () => {
        if (commits.length > 0) {
            setShowCommits(true);
            return;
        }
        setCommitsLoading(true);
        setShowCommits(true);
        try {
            const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${WINDECK_REPO}/commits?per_page=20`);
            if (res.ok) {
                const data = await res.json();
                setCommits(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error('Commits fetch error:', err);
            setCommits([
                { sha: '1', commit: { message: 'Initial WinDeck release', author: { name: 'Darshan Satbhai', date: '2025-12-01T10:00:00Z' } } },
                { sha: '2', commit: { message: 'Added AES-256 encryption layer', author: { name: 'Darshan Satbhai', date: '2025-11-28T10:00:00Z' } } },
                { sha: '3', commit: { message: 'Gyro air mouse implementation', author: { name: 'Darshan Satbhai', date: '2025-11-25T10:00:00Z' } } },
            ]);
        } finally {
            setCommitsLoading(false);
        }
    };

    const statCards = [
        { icon: <Folder size={20} />, value: stats.publicRepos, label: 'Repositories' },
        { icon: <Star size={20} />, value: stats.totalStars, label: 'Total Stars' },
        { icon: <GitFork size={20} />, value: stats.totalForks, label: 'Total Forks' },
        { icon: <Code size={20} />, value: stats.languages.length, label: 'Languages' },
    ];

    return (
        <>
        <motion.div
            className="gh-widget"
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Header */}
            <div className="gh-header">
                <div className="gh-header-left">
                    <div className="gh-terminal-icon">~</div>
                    <div>
                        <h3 className="gh-title">Live from GitHub</h3>
                        <p className="gh-subtitle">@{GITHUB_USERNAME}</p>
                    </div>
                </div>
                <a href={stats.profileUrl} target="_blank" rel="noopener noreferrer" className="gh-profile-link interactive">
                    View Profile →
                </a>
            </div>

            {/* Stats Grid */}
            <div className="gh-stats-grid">
                {statCards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        className="gh-stat-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    >
                        <div className="gh-stat-icon">{card.icon}</div>
                        <div className="gh-stat-value">{card.value}</div>
                        <div className="gh-stat-label">{card.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Languages */}
            <div className="gh-languages">
                <span className="gh-lang-label">Languages:</span>
                <div className="gh-lang-tags">
                    {stats.languages.map((lang) => (
                        <span key={lang} className="gh-lang-tag">{lang}</span>
                    ))}
                </div>
            </div>

            {/* WinDeck Repo + Commits Button */}
            <div className="gh-windeck-row">
                <div className="gh-windeck-info">
                    <GitCommit size={16} className="gh-windeck-icon" />
                    <span className="gh-windeck-label">Featured Repo:</span>
                    <a 
                        href={`https://github.com/${GITHUB_USERNAME}/${WINDECK_REPO}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="gh-windeck-name interactive"
                    >
                        {WINDECK_REPO} <ExternalLink size={12} />
                    </a>
                </div>
                <button className="gh-commits-btn interactive" onClick={fetchCommits}>
                    <GitCommit size={14} />
                    View Commits
                </button>
            </div>
        </motion.div>

        {/* Commits Modal */}
        <AnimatePresence>
            {showCommits && (
                <motion.div 
                    className="gh-commits-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowCommits(false)}
                >
                    <motion.div 
                        className="gh-commits-modal"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="gh-commits-header">
                            <div>
                                <h3>WinDeck Commits</h3>
                                <p>{GITHUB_USERNAME}/{WINDECK_REPO}</p>
                            </div>
                            <button className="gh-commits-close interactive" onClick={() => setShowCommits(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="gh-commits-list">
                            {commitsLoading ? (
                                <div className="gh-commits-loading">Loading commits...</div>
                            ) : commits.length === 0 ? (
                                <div className="gh-commits-loading">No commits found</div>
                            ) : (
                                commits.map((c, i) => (
                                    <motion.div 
                                        key={c.sha} 
                                        className="gh-commit-item"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.03 }}
                                    >
                                        <div className="gh-commit-dot" />
                                        <div className="gh-commit-content">
                                            <p className="gh-commit-msg">{c.commit.message}</p>
                                            <div className="gh-commit-meta">
                                                <span>{c.commit.author.name}</span>
                                                <span>•</span>
                                                <span>{new Date(c.commit.author.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                <span>•</span>
                                                <span className="gh-commit-sha">{c.sha.slice(0, 7)}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default GitHubStats;

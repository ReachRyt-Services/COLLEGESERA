import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { DatabaseArticle } from '@/types/database';

const SEO_USERNAME = 'seo';
const SEO_PASSWORD = 'CollegeSera@SEO';
const SESSION_KEY  = 'seo_sitemap_session';

type SitemapEntry = {
  id: number;
  type: 'static' | 'college' | 'seo_search' | 'article';
  loc: string;
  slug: string | null;
  college_name: string | null;
  priority: string;
  changefreq: string;
  lastmod: string | null;
  exclude: boolean;
  notes: string | null;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  og_image: string | null;
};

type EditMap = Record<number, Partial<SitemapEntry>>;

const PRIORITY_OPTIONS   = ['1.0','0.9','0.8','0.7','0.6','0.5','0.4','0.3'];
const CHANGEFREQ_OPTIONS = ['always','hourly','daily','weekly','monthly','yearly','never'];

// ─── Login ───────────────────────────────────────────────────────────────────
function Login({ onLogin }: { onLogin: () => void }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true);
    setTimeout(() => {
      if (u === SEO_USERNAME && p === SEO_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, 'true'); onLogin();
      } else { setErr('Invalid credentials.'); setBusy(false); }
    }, 400);
  };

  const inp: React.CSSProperties = { width: '100%', padding: '11px 13px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
  const lbl: React.CSSProperties = { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 };

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#0f0c29,#302b63,#24243e)', fontFamily:"'Inter',sans-serif" }}>
      <div style={{ background:'rgba(255,255,255,0.05)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:20, padding:'48px 40px', width:380 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ width:56,height:56,borderRadius:16,margin:'0 auto 16px',background:'linear-gradient(135deg,#f97316,#ea580c)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24 }}>🗺️</div>
          <h1 style={{ color:'#fff',fontSize:22,fontWeight:700,margin:0 }}>SEO &amp; Sitemap Portal</h1>
          <p style={{ color:'rgba(255,255,255,0.4)',fontSize:13,marginTop:6 }}>CollegeSera Landing Page &amp; SEO Manager</p>
        </div>
        <form onSubmit={submit}>
          <div style={{ marginBottom:16 }}><label style={lbl}>Username</label><input type="text" value={u} onChange={e=>setU(e.target.value)} style={inp} placeholder="Username" autoFocus /></div>
          <div style={{ marginBottom:24 }}><label style={lbl}>Password</label><input type="password" value={p} onChange={e=>setP(e.target.value)} style={inp} placeholder="Password" /></div>
          {err && <p style={{ color:'#ff6b6b',fontSize:13,marginBottom:16,textAlign:'center' }}>{err}</p>}
          <button type="submit" disabled={busy} style={{ width:'100%',padding:'13px',background:'linear-gradient(135deg,#f97316,#ea580c)',border:'none',borderRadius:10,color:'#fff',fontSize:15,fontWeight:600,cursor:'pointer',opacity:busy?0.7:1 }}>
            {busy ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Editor ──────────────────────────────────────────────────────────────────
function Editor({ onLogout }: { onLogout: () => void }) {
  const [entries, setEntries] = useState<SitemapEntry[]>([]);
  const [edits, setEdits]     = useState<EditMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState<Record<number,boolean>>({});
  const [saved, setSaved]     = useState<Record<number,boolean>>({});
  const [expanded, setExpanded] = useState<Record<number,boolean>>({});
  const [tab, setTab]         = useState<'seo_search'|'articles'|'static'|'college'>('seo_search');
  const [search, setSearch]   = useState('');
  const [page, setPage]       = useState(1);
  const [toast, setToast]     = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLoc, setNewLoc]   = useState('');
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newKeywords, setNewKeywords] = useState('');
  const PAGE = 50;

  // Articles state
  const [articles, setArticles] = useState<DatabaseArticle[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<DatabaseArticle | null>(null);

  // Article form state
  const [articleTitle, setArticleTitle] = useState('');
  const [articleSlug, setArticleSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [articleLabel, setArticleLabel] = useState('Exam');
  const [customLabel, setCustomLabel] = useState('');
  const [articleStatus, setArticleStatus] = useState<'published' | 'draft'>('published');
  const [articleFeatured, setArticleFeatured] = useState(false);
  const [articleFeaturedImage, setArticleFeaturedImage] = useState('');
  const [articleExcerpt, setArticleExcerpt] = useState('');
  const [articleMetaDesc, setArticleMetaDesc] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleSubmitting, setArticleSubmitting] = useState(false);

  const flash = (msg: string) => { setToast(msg); setTimeout(()=>setToast(''), 3000); };

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('sitemap_entries').select('*').order('sort_order').order('loc');
    if (!error) setEntries(data as SitemapEntry[]);
    setLoading(false);
  }, []);

  const loadArticles = useCallback(async () => {
    setArticlesLoading(true);
    const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (!error && data) setArticles(data as DatabaseArticle[]);
    setArticlesLoading(false);
  }, []);

  useEffect(() => {
    load();
    loadArticles();
  }, [load, loadArticles]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (val: string) => {
    setArticleTitle(val);
    if (autoSlug && !editingArticle) {
      setArticleSlug(generateSlug(val));
    }
  };

  const openAddArticleModal = () => {
    setEditingArticle(null);
    setArticleTitle('');
    setArticleSlug('');
    setAutoSlug(true);
    setArticleLabel('Exam');
    setCustomLabel('');
    setArticleStatus('published');
    setArticleFeatured(false);
    setArticleFeaturedImage('');
    setArticleExcerpt('');
    setArticleMetaDesc('');
    setArticleContent('');
    setShowAddArticleModal(true);
  };

  const openEditArticleModal = (art: DatabaseArticle) => {
    setEditingArticle(art);
    setArticleTitle(art.title || '');
    setArticleSlug(art.slug || '');
    setAutoSlug(false);
    const standardLabels = ['Exam', 'Colleges', 'Admissions', 'Courses', 'Career', 'Guide', 'News', 'Scholarship'];
    if (art.article_label && !standardLabels.includes(art.article_label)) {
      setArticleLabel('Custom');
      setCustomLabel(art.article_label);
    } else {
      setArticleLabel(art.article_label || 'Exam');
      setCustomLabel('');
    }
    setArticleStatus((art.status as 'published' | 'draft') || 'published');
    setArticleFeatured(!!art.featured);
    setArticleFeaturedImage(art.featured_image || '');
    setArticleExcerpt(art.excerpt || '');
    setArticleMetaDesc(art.meta_description || '');
    setArticleContent(art.content || '');
    setShowAddArticleModal(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleTitle.trim()) { flash('❌ Article title is required'); return; }
    const finalSlug = (articleSlug.trim() || generateSlug(articleTitle)).trim();
    if (!finalSlug) { flash('❌ Valid URL slug is required'); return; }

    const finalLabel = articleLabel === 'Custom' ? (customLabel.trim() || 'General') : articleLabel;

    setArticleSubmitting(true);

    if (editingArticle) {
      const updates = {
        title: articleTitle.trim(),
        slug: finalSlug,
        article_label: finalLabel,
        status: articleStatus,
        featured: articleFeatured,
        featured_image: articleFeaturedImage.trim() || null,
        excerpt: articleExcerpt.trim() || null,
        meta_description: articleMetaDesc.trim() || null,
        content: articleContent.trim(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('articles')
        .update(updates)
        .eq('id', editingArticle.id)
        .select()
        .single();

      setArticleSubmitting(false);
      if (error) {
        flash(`❌ Failed to update article: ${error.message}`);
      } else {
        // If slug changed, delete old loc from sitemap_entries
        if (editingArticle.slug && editingArticle.slug !== finalSlug) {
          await supabase.from('sitemap_entries').delete().eq('loc', `/articles/${editingArticle.slug}`);
        }

        // Upsert into sitemap_entries
        if (articleStatus === 'published') {
          await supabase.from('sitemap_entries').upsert({
            loc: `/articles/${finalSlug}`,
            type: 'article',
            slug: finalSlug,
            college_name: articleTitle.trim(),
            priority: '0.8',
            changefreq: 'weekly',
            exclude: false,
            notes: finalLabel || 'Article',
            lastmod: new Date().toISOString().slice(0, 10),
            seo_title: articleTitle.trim(),
            seo_description: articleMetaDesc.trim() || articleExcerpt.trim() || null,
            og_image: articleFeaturedImage.trim() || null,
          }, { onConflict: 'loc' });
        } else {
          await supabase.from('sitemap_entries').update({ exclude: true }).eq('loc', `/articles/${finalSlug}`);
        }
        load(); // Refresh sitemap entries

        setArticles(prev => prev.map(a => a.id === editingArticle.id ? (data as DatabaseArticle) : a));
        setShowAddArticleModal(false);
        setEditingArticle(null);
        flash('✅ Article updated successfully!');
      }
    } else {
      const newArticle = {
        title: articleTitle.trim(),
        slug: finalSlug,
        article_label: finalLabel,
        status: articleStatus,
        featured: articleFeatured,
        featured_image: articleFeaturedImage.trim() || null,
        excerpt: articleExcerpt.trim() || null,
        meta_description: articleMetaDesc.trim() || null,
        content: articleContent.trim(),
        author_id: 'seo',
        views: 0
      };

      const { data, error } = await supabase
        .from('articles')
        .insert([newArticle])
        .select()
        .single();

      setArticleSubmitting(false);
      if (error) {
        flash(`❌ Failed to create article: ${error.message}`);
      } else {
        if (articleStatus === 'published') {
          await supabase.from('sitemap_entries').upsert({
            loc: `/articles/${finalSlug}`,
            type: 'article',
            slug: finalSlug,
            college_name: articleTitle.trim(),
            priority: '0.8',
            changefreq: 'weekly',
            exclude: false,
            notes: finalLabel || 'Article',
            lastmod: new Date().toISOString().slice(0, 10),
            seo_title: articleTitle.trim(),
            seo_description: articleMetaDesc.trim() || articleExcerpt.trim() || null,
            og_image: articleFeaturedImage.trim() || null,
          }, { onConflict: 'loc' });
          load(); // Refresh sitemap entries
        }

        setArticles(prev => [data as DatabaseArticle, ...prev]);
        setShowAddArticleModal(false);
        flash(articleStatus === 'published'
          ? '✅ Article published! It is now live on the /articles page and sitemap.'
          : '✅ Article saved as draft.'
        );
      }
    }
  };

  const handleToggleArticleStatus = async (art: DatabaseArticle) => {
    const nextStatus = art.status === 'published' ? 'draft' : 'published';
    const { error } = await supabase
      .from('articles')
      .update({ status: nextStatus, updated_at: new Date().toISOString() })
      .eq('id', art.id);

    if (error) {
      flash(`❌ Failed to update status: ${error.message}`);
    } else {
      const loc = `/articles/${art.slug}`;
      if (nextStatus === 'published') {
        await supabase.from('sitemap_entries').upsert({
          loc,
          type: 'article',
          slug: art.slug,
          college_name: art.title,
          priority: '0.8',
          changefreq: 'weekly',
          exclude: false,
          notes: art.article_label || 'Article',
          lastmod: new Date().toISOString().slice(0, 10),
        }, { onConflict: 'loc' });
      } else {
        await supabase.from('sitemap_entries').update({ exclude: true }).eq('loc', loc);
      }
      load();

      setArticles(prev => prev.map(a => a.id === art.id ? { ...a, status: nextStatus } : a));
      flash(nextStatus === 'published' ? '✅ Article published! Live on /articles & sitemap' : '⏸️ Article moved to drafts (hidden from /articles & sitemap)');
    }
  };

  const handleDeleteArticle = async (art: DatabaseArticle) => {
    if (!window.confirm(`Are you sure you want to delete "${art.title}"? This cannot be undone.`)) return;
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', art.id);

    if (error) {
      flash(`❌ Failed to delete: ${error.message}`);
    } else {
      await supabase.from('sitemap_entries').delete().eq('loc', `/articles/${art.slug}`);
      load();
      setArticles(prev => prev.filter(a => a.id !== art.id));
      flash(`🗑️ Deleted "${art.title}" successfully!`);
    }
  };

  const set = (id: number, f: keyof SitemapEntry, v: unknown) =>
    setEdits(p => ({ ...p, [id]: { ...p[id], [f]: v } }));

  const get = <K extends keyof SitemapEntry>(e: SitemapEntry, f: K): SitemapEntry[K] =>
    ((edits[e.id]?.[f] ?? e[f]) as SitemapEntry[K]);

  const dirty = (id: number) => !!edits[id] && Object.keys(edits[id]).length > 0;

  const saveRow = async (entry: SitemapEntry) => {
    if (!dirty(entry.id)) return;
    setSaving(p => ({ ...p, [entry.id]: true }));
    const updates = edits[entry.id];
    const { error } = await supabase.from('sitemap_entries').update(updates).eq('id', entry.id);
    setSaving(p => ({ ...p, [entry.id]: false }));
    if (error) { flash(`❌ ${error.message}`); return; }
    setEdits(p => { const n={...p}; delete n[entry.id]; return n; });
    setEntries(p => p.map(e => e.id===entry.id ? {...e,...updates} : e));
    setSaved(p => ({ ...p, [entry.id]: true }));
    setTimeout(() => setSaved(p => { const n={...p}; delete n[entry.id]; return n; }), 2000);
    flash('✅ Changes saved & live!');
  };

  const saveAll = async () => {
    const ids = Object.keys(edits).map(Number).filter(dirty);
    if (!ids.length) { flash('Nothing to save.'); return; }
    for (const id of ids) { const e = entries.find(x=>x.id===id); if (e) await saveRow(e); }
  };

  const handleDelete = async (entry: SitemapEntry) => {
    if (!window.confirm(`Are you sure you want to delete "${entry.loc}"? This cannot be undone.`)) return;
    setSaving(p => ({ ...p, [entry.id]: true }));
    const { error } = await supabase.from('sitemap_entries').delete().eq('id', entry.id);
    setSaving(p => ({ ...p, [entry.id]: false }));
    if (error) {
      flash(`❌ Failed to delete: ${error.message}`);
    } else {
      setEntries(prev => prev.filter(e => e.id !== entry.id));
      setEdits(p => { const n = { ...p }; delete n[entry.id]; return n; });
      flash(`🗑️ Deleted "${entry.loc}" successfully!`);
    }
  };

  const handleAddLandingPage = async (e: React.FormEvent) => {
    e.preventDefault();
    let path = newLoc.trim();
    if (!path.startsWith('/')) path = '/' + path;
    if (!path || path.length < 2) { flash('❌ Invalid URL path'); return; }

    const newEntry = {
      loc: path,
      type: 'seo_search' as const,
      college_name: newName.trim() || null,
      seo_title: newTitle.trim() ? (newTitle.includes('|') ? newTitle.trim() : `${newTitle.trim()} | Collegesera`) : null,
      seo_description: newDesc.trim() || null,
      notes: newKeywords.trim() || null,
      priority: '0.9',
      changefreq: 'weekly',
      exclude: false,
      sort_order: 260
    };

    const { data, error } = await supabase.from('sitemap_entries').insert(newEntry).select().single();
    if (error) {
      flash(`❌ ${error.message}`);
    } else {
      setEntries(prev => [...prev, data as SitemapEntry]);
      setShowAddModal(false);
      setNewLoc('');
      setNewName('');
      setNewTitle('');
      setNewDesc('');
      setNewKeywords('');
      flash('✅ New Landing Page added!');
    }
  };

  const filtered = entries.filter(e => e.type===tab && (!search || e.loc.toLowerCase().includes(search.toLowerCase()) || (e.college_name||'').toLowerCase().includes(search.toLowerCase())));
  const totalPages = Math.ceil(filtered.length / PAGE);
  const paged = filtered.slice((page-1)*PAGE, page*PAGE);

  const filteredArticles = articles.filter(a =>
    !search ||
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.slug.toLowerCase().includes(search.toLowerCase()) ||
    (a.article_label || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.excerpt || '').toLowerCase().includes(search.toLowerCase())
  );
  const totalArticlePages = Math.ceil(filteredArticles.length / PAGE);
  const pagedArticles = filteredArticles.slice((page-1)*PAGE, page*PAGE);

  const currentTotalPages = tab === 'articles' ? totalArticlePages : totalPages;
  const dirtyCount = Object.keys(edits).length;

  // Shared styles
  const inp = (w?: number|string): React.CSSProperties => ({ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:6, color:'#e2e8f0', padding:'6px 10px', fontSize:12, width:w||'100%', outline:'none', boxSizing:'border-box' });
  const sel: React.CSSProperties = { background:'#1a1a2e', border:'1px solid rgba(255,255,255,0.12)', borderRadius:6, color:'#e2e8f0', padding:'5px 8px', fontSize:12, outline:'none', cursor:'pointer' };
  const saveBtnStyle = (d:boolean,ok:boolean): React.CSSProperties => ({ padding:'6px 14px', borderRadius:6, border:'none', fontSize:12, fontWeight:600, cursor:d?'pointer':'default', background:ok?'#22c55e':d?'linear-gradient(135deg,#f97316,#ea580c)':'rgba(255,255,255,0.07)', color:d||ok?'#fff':'rgba(255,255,255,0.3)', transition:'all 0.2s', whiteSpace:'nowrap' });

  return (
    <div style={{ minHeight:'100vh', background:'#0d0d1a', fontFamily:"'Inter',sans-serif", color:'#e2e8f0' }}>
      {/* Topbar */}
      <div style={{ background:'rgba(255,255,255,0.03)', borderBottom:'1px solid rgba(255,255,255,0.08)', padding:'14px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:100, backdropFilter:'blur(12px)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <span style={{ fontSize:22 }}>🗺️</span>
          <div>
            <div style={{ fontWeight:700, fontSize:16, display:'flex', alignItems:'center', gap:8 }}>
              SEO &amp; Landing Page Manager
              <span style={{ fontSize:11, padding:'2px 8px', background:'rgba(249,115,22,0.2)', color:'#fb923c', borderRadius:12, fontWeight:600 }}>Live Admin</span>
            </div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginTop:2 }}>
              {entries.filter(e => e.type==='seo_search').length} SEO Landing Pages &bull; {articles.length} Articles &bull; {entries.length} Total URLs
            </div>
          </div>
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <a
            href="https://collegesera.com/articles"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize:12, padding:'7px 12px', background:'rgba(249,115,22,0.12)', border:'1px solid rgba(249,115,22,0.3)', borderRadius:8, color:'#fdba74', textDecoration:'none', display:'flex', alignItems:'center', gap:5, fontWeight:600 }}
          >
            <span>Live Articles ↗</span>
          </a>
          <a
            href="https://collegesera.com/sitemap.xml"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize:12, padding:'7px 12px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, color:'#93c5fd', textDecoration:'none', display:'flex', alignItems:'center', gap:5 }}
          >
            <span>XML Sitemap ↗</span>
          </a>
          {dirtyCount>0 && <span style={{ fontSize:12, color:'#fbbf24', background:'rgba(251,191,36,0.1)', padding:'5px 12px', borderRadius:20, fontWeight:600 }}>{dirtyCount} unsaved</span>}
          {tab !== 'articles' && (
            <button onClick={saveAll} style={{ padding:'8px 18px', background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', borderRadius:8, color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer' }}>Save All</button>
          )}
          <button onClick={onLogout} style={{ padding:'8px 14px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, color:'rgba(255,255,255,0.6)', fontSize:12, cursor:'pointer' }}>Logout</button>
        </div>
      </div>

      <div style={{ padding:24, maxWidth:1600, margin:'0 auto' }}>
        {/* Info Banner */}
        <div style={{ background:'rgba(249,115,22,0.08)', border:'1px solid rgba(249,115,22,0.25)', borderRadius:12, padding:'14px 18px', marginBottom:20, fontSize:13, color:'rgba(255,255,255,0.8)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <div>
            {tab === 'articles' ? (
              <>
                <strong style={{ color:'#fdba74' }}>Live Articles Manager:</strong> Add, edit, and publish articles to appear on the public <a href="/articles" target="_blank" rel="noreferrer" style={{ color:'#38bdf8', textDecoration:'underline', fontWeight:600 }}>/articles</a> page. Configure categories, SEO titles, featured status, and banner images.
              </>
            ) : (
              <>
                <strong style={{ color:'#fdba74' }}>Live SEO Controls:</strong> Edit H1 Header, Page Title, Meta Description, and Meta Keywords for the 8 key landing pages. Changes update immediately on the live website.
              </>
            )}
          </div>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)' }}>
            {tab === 'articles' ? (
              <span>Articles Page: <a href="https://collegesera.com/articles" target="_blank" rel="noreferrer" style={{ color:'#38bdf8' }}>https://collegesera.com/articles ↗</a></span>
            ) : (
              <span>Dynamic Sitemap: <code style={{ color:'#38bdf8' }}>https://collegesera.com/sitemap.xml</code></span>
            )}
          </div>
        </div>

        {/* Tabs + search */}
        <div style={{ display:'flex', gap:16, alignItems:'center', marginBottom:18, flexWrap:'wrap', justifyContent:'space-between' }}>
          <div style={{ display:'flex', gap:6, background:'rgba(255,255,255,0.05)', borderRadius:10, padding:4 }}>
            {[
              { key: 'seo_search', label: `🎯 8 Landing Pages (${entries.filter(e=>e.type==='seo_search').length})` },
              { key: 'articles', label: `📰 Articles (${articles.length})` },
              { key: 'static', label: `Static Pages (${entries.filter(e=>e.type==='static').length})` },
              { key: 'college', label: `Colleges (${entries.filter(e=>e.type==='college').length})` },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key as any); setPage(1); }}
                style={{
                  padding:'8px 18px',
                  borderRadius:8,
                  border:'none',
                  cursor:'pointer',
                  fontSize:13,
                  fontWeight:600,
                  background:tab===t.key?'linear-gradient(135deg,#f97316,#ea580c)':'transparent',
                  color:tab===t.key?'#fff':'rgba(255,255,255,0.6)',
                  transition:'all 0.15s'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            {tab === 'seo_search' && (
              <button
                onClick={() => setShowAddModal(true)}
                style={{ padding:'8px 16px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:8, color:'#fff', fontSize:12, fontWeight:600, cursor:'pointer' }}
              >
                + Add Landing Page
              </button>
            )}
            {tab === 'articles' && (
              <button
                onClick={openAddArticleModal}
                style={{ padding:'8px 16px', background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', borderRadius:8, color:'#fff', fontSize:12, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}
              >
                <span>➕</span>
                <span>Add Article to /articles</span>
              </button>
            )}
            <input
              placeholder={tab === 'articles' ? "Search articles by title, slug, category…" : "Search by URL or title…"}
              value={search}
              onChange={e=>{setSearch(e.target.value);setPage(1);}}
              style={{ ...inp(260), padding:'8px 14px', borderRadius:8 }}
            />
            <span style={{ fontSize:12, color:'rgba(255,255,255,0.4)' }}>
              {tab === 'articles' ? `${filteredArticles.length} articles` : `${filtered.length} entries`}
            </span>
          </div>
        </div>

        {/* Content Area */}
        {tab === 'articles' ? (
          articlesLoading ? (
            <div style={{ textAlign:'center', padding:60, color:'rgba(255,255,255,0.4)' }}>Loading articles…</div>
          ) : (
            <div style={{ background:'rgba(255,255,255,0.02)', borderRadius:14, border:'1px solid rgba(255,255,255,0.07)', overflow:'hidden' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr style={{ background:'rgba(255,255,255,0.02)' }}>
                    {['Article / Title', 'Live Link & Slug', 'Category', 'Status on /articles', 'Featured', 'Created', 'Actions'].map(h => (
                      <th key={h} style={{ padding:'12px 14px', textAlign:'left', color:'rgba(255,255,255,0.45)', fontWeight:600, fontSize:11, textTransform:'uppercase', letterSpacing:0.8, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pagedArticles.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign:'center', padding:'56px 20px', color:'rgba(255,255,255,0.4)' }}>
                        <div style={{ fontSize:32, marginBottom:10 }}>📰</div>
                        <div style={{ fontSize:15, fontWeight:600, color:'#fff', marginBottom:6 }}>No articles found</div>
                        <div style={{ fontSize:12, marginBottom:16 }}>Click below to create an article that will show up on the /articles page</div>
                        <button
                          onClick={openAddArticleModal}
                          style={{ padding:'8px 18px', background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', borderRadius:8, color:'#fff', fontWeight:600, cursor:'pointer', fontSize:13 }}
                        >
                          + Add New Article
                        </button>
                      </td>
                    </tr>
                  ) : (
                    pagedArticles.map(art => (
                      <tr key={art.id} style={{ borderBottom:'1px solid rgba(255,255,255,0.05)', background: art.status === 'published' ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                        {/* Title & Excerpt */}
                        <td style={{ padding:'12px 14px', minWidth:260 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                            {art.featured_image ? (
                              <img
                                src={art.featured_image}
                                alt=""
                                style={{ width:44, height:44, borderRadius:8, objectFit:'cover', flexShrink:0, border:'1px solid rgba(255,255,255,0.1)' }}
                                onError={e => { (e.target as HTMLElement).style.display = 'none'; }}
                              />
                            ) : (
                              <div style={{ width:44, height:44, borderRadius:8, background:'rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0, border:'1px solid rgba(255,255,255,0.08)' }}>
                                📄
                              </div>
                            )}
                            <div>
                              <div style={{ fontWeight:600, color:'#fff', fontSize:13, lineHeight:1.3 }}>{art.title}</div>
                              {art.excerpt && (
                                <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginTop:3, maxWidth:340, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                                  {art.excerpt}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Live Link & Slug */}
                        <td style={{ padding:'12px 14px', minWidth:180 }}>
                          <a
                            href={`/articles/${art.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color:'#60a5fa', textDecoration:'none', fontWeight:600, fontSize:12, display:'inline-flex', alignItems:'center', gap:4 }}
                          >
                            <span>/articles/{art.slug}</span>
                            <span>↗</span>
                          </a>
                          <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', marginTop:3 }}>
                            👁 {art.views || 0} views
                          </div>
                        </td>

                        {/* Category */}
                        <td style={{ padding:'12px 14px', whiteSpace:'nowrap' }}>
                          <span style={{ fontSize:11, padding:'3px 9px', borderRadius:12, background:'rgba(249,115,22,0.12)', color:'#fb923c', border:'1px solid rgba(249,115,22,0.25)', fontWeight:600 }}>
                            {art.article_label || 'General'}
                          </span>
                        </td>

                        {/* Status on /articles */}
                        <td style={{ padding:'12px 14px', whiteSpace:'nowrap' }}>
                          <button
                            onClick={() => handleToggleArticleStatus(art)}
                            title={art.status === 'published' ? "Click to set Draft (hide from /articles)" : "Click to Publish (show on /articles)"}
                            style={{
                              display:'inline-flex',
                              alignItems:'center',
                              gap:6,
                              padding:'4px 10px',
                              borderRadius:20,
                              fontSize:11,
                              fontWeight:600,
                              border:'none',
                              cursor:'pointer',
                              background: art.status === 'published' ? 'rgba(34,197,94,0.15)' : 'rgba(156,163,175,0.15)',
                              color: art.status === 'published' ? '#4ade80' : '#9ca3af',
                              borderStyle:'solid',
                              borderWidth:1,
                              borderColor: art.status === 'published' ? 'rgba(34,197,94,0.3)' : 'rgba(156,163,175,0.2)'
                            }}
                          >
                            <span style={{ fontSize:8 }}>{art.status === 'published' ? '🟢' : '⚪'}</span>
                            <span>{art.status === 'published' ? 'Live on /articles' : 'Draft (Hidden)'}</span>
                          </button>
                        </td>

                        {/* Featured */}
                        <td style={{ padding:'12px 14px', whiteSpace:'nowrap' }}>
                          {art.featured ? (
                            <span style={{ fontSize:11, padding:'2px 8px', borderRadius:10, background:'rgba(234,179,8,0.15)', color:'#facc15', border:'1px solid rgba(234,179,8,0.3)', fontWeight:600 }}>
                              ⭐ Featured
                            </span>
                          ) : (
                            <span style={{ fontSize:11, color:'rgba(255,255,255,0.3)' }}>Standard</span>
                          )}
                        </td>

                        {/* Date */}
                        <td style={{ padding:'12px 14px', whiteSpace:'nowrap', fontSize:12, color:'rgba(255,255,255,0.5)' }}>
                          {art.created_at ? new Date(art.created_at).toLocaleDateString() : '—'}
                        </td>

                        {/* Actions */}
                        <td style={{ padding:'12px 14px', whiteSpace:'nowrap' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                            <button
                              onClick={() => openEditArticleModal(art)}
                              style={{ padding:'6px 12px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:6, color:'#fff', cursor:'pointer', fontSize:12, fontWeight:500 }}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(art)}
                              style={{ padding:'6px 10px', background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:6, color:'#f87171', cursor:'pointer', fontSize:12, fontWeight:500 }}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Pagination for Articles */}
              {currentTotalPages > 1 && (
                <div style={{ padding:'12px 16px', display:'flex', justifyContent:'center', alignItems:'center', gap:8, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                  <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{ padding:'5px 12px', borderRadius:6, border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'#fff', cursor:'pointer', fontSize:12, opacity:page===1?0.4:1 }}>← Prev</button>
                  <span style={{ fontSize:12, color:'rgba(255,255,255,0.5)' }}>Page {page} of {currentTotalPages}</span>
                  <button onClick={()=>setPage(p=>Math.min(currentTotalPages,p+1))} disabled={page===currentTotalPages} style={{ padding:'5px 12px', borderRadius:6, border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'#fff', cursor:'pointer', fontSize:12, opacity:page===currentTotalPages?0.4:1 }}>Next →</button>
                </div>
              )}
            </div>
          )
        ) : (
          /* Sitemap Entries Table */
          loading ? (
            <div style={{ textAlign:'center', padding:60, color:'rgba(255,255,255,0.4)' }}>Loading entries…</div>
          ) : (
            <div style={{ background:'rgba(255,255,255,0.02)', borderRadius:14, border:'1px solid rgba(255,255,255,0.07)', overflow:'hidden' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr style={{ background:'rgba(255,255,255,0.02)' }}>
                    {['Page / URL', 'H1 / Header', 'Title Tag (<title>)', 'Meta Description', 'Priority', 'Exclude', 'SEO Details', 'Actions'].map(h => (
                      <th key={h} style={{ padding:'12px 14px', textAlign:'left', color:'rgba(255,255,255,0.45)', fontWeight:600, fontSize:11, textTransform:'uppercase', letterSpacing:0.8, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paged.map(entry => {
                    const d = dirty(entry.id);
                    const excl = get(entry,'exclude') as boolean;
                    const exp = expanded[entry.id];
                    return (
                      <>
                        <tr key={entry.id} style={{ background: excl?'rgba(255,100,100,0.06)':d?'rgba(249,115,22,0.08)':'transparent' }}>
                          {/* URL & Link */}
                          <td style={{ padding:'12px 14px', borderBottom: exp?'none':'1px solid rgba(255,255,255,0.05)', maxWidth:260 }}>
                            <a
                              href={`https://collegesera.com${entry.loc}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{ color:'#60a5fa', textDecoration:'none', fontWeight:600, fontSize:12, display:'flex', alignItems:'center', gap:4 }}
                            >
                              <span style={{ wordBreak:'break-all' }}>{entry.loc}</span>
                              <span>↗</span>
                            </a>
                            <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', marginTop:2 }}>
                              Type: {entry.type}
                            </div>
                          </td>

                          {/* H1 / Header */}
                          <td style={{ padding:'12px 14px', borderBottom: exp?'none':'1px solid rgba(255,255,255,0.05)', minWidth:180 }}>
                            <input
                              type="text"
                              value={(get(entry,'college_name') as string)||''}
                              onChange={e=>set(entry.id,'college_name',e.target.value||null)}
                              placeholder="H1 Header…"
                              style={{ ...inp(), fontWeight:500 }}
                            />
                          </td>

                          {/* Title Tag */}
                          <td style={{ padding:'12px 14px', borderBottom: exp?'none':'1px solid rgba(255,255,255,0.05)', minWidth:220 }}>
                            <input
                              type="text"
                              value={(get(entry,'seo_title') as string)||''}
                              onChange={e=>set(entry.id,'seo_title',e.target.value||null)}
                              placeholder="Custom <title> tag…"
                              style={inp()}
                            />
                          </td>

                          {/* Meta Description */}
                          <td style={{ padding:'12px 14px', borderBottom: exp?'none':'1px solid rgba(255,255,255,0.05)', minWidth:240 }}>
                            <input
                              type="text"
                              value={(get(entry,'seo_description') as string)||''}
                              onChange={e=>set(entry.id,'seo_description',e.target.value||null)}
                              placeholder="Custom meta description…"
                              style={inp()}
                            />
                          </td>

                          {/* Priority */}
                          <td style={{ padding:'12px 14px', borderBottom: exp?'none':'1px solid rgba(255,255,255,0.05)' }}>
                            <select value={get(entry,'priority') as string} onChange={e=>set(entry.id,'priority',e.target.value)} style={sel}>
                              {PRIORITY_OPTIONS.map(p=><option key={p} value={p}>{p}</option>)}
                            </select>
                          </td>

                          {/* Exclude */}
                          <td style={{ padding:'12px 14px', borderBottom: exp?'none':'1px solid rgba(255,255,255,0.05)', textAlign:'center' }}>
                            <div onClick={()=>set(entry.id,'exclude',!excl)} style={{ width:38,height:20,borderRadius:10,position:'relative',cursor:'pointer',background:excl?'#ef4444':'rgba(255,255,255,0.1)',transition:'background 0.2s',margin:'0 auto' }}>
                              <div style={{ width:16,height:16,borderRadius:'50%',background:'#fff',position:'absolute',top:2,left:excl?20:2,transition:'left 0.2s' }} />
                            </div>
                          </td>

                          {/* SEO expand */}
                          <td style={{ padding:'12px 14px', borderBottom: exp?'none':'1px solid rgba(255,255,255,0.05)' }}>
                            <button onClick={()=>setExpanded(p=>({...p,[entry.id]:!p[entry.id]}))} style={{ padding:'5px 11px', background:'rgba(249,115,22,0.15)', border:'1px solid rgba(249,115,22,0.3)', borderRadius:6, color:'#fdba74', fontSize:11, fontWeight:600, cursor:'pointer' }}>
                              {exp?'▲ Full SEO':'▾ Full SEO'}
                            </button>
                          </td>

                          {/* Save & Delete Actions */}
                          <td style={{ padding:'12px 14px', borderBottom: exp?'none':'1px solid rgba(255,255,255,0.05)', whiteSpace:'nowrap' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                              <button onClick={()=>saveRow(entry)} disabled={!d||saving[entry.id]} style={saveBtnStyle(d,!!saved[entry.id])}>
                                {saving[entry.id]?'…':saved[entry.id]?'✓ Saved':d?'Save':'—'}
                              </button>
                              <button
                                onClick={()=>handleDelete(entry)}
                                disabled={saving[entry.id]}
                                title={`Delete ${entry.loc}`}
                                style={{
                                  padding:'6px 10px',
                                  background:'rgba(239,68,68,0.12)',
                                  border:'1px solid rgba(239,68,68,0.3)',
                                  borderRadius:6,
                                  color:'#f87171',
                                  cursor:'pointer',
                                  fontSize:11,
                                  fontWeight:600,
                                  display:'inline-flex',
                                  alignItems:'center',
                                  gap:4,
                                  transition:'all 0.15s'
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.25)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.12)')}
                              >
                                <span>🗑️</span>
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* SEO expanded row */}
                        {exp && (
                          <tr key={`${entry.id}-seo`}>
                            <td colSpan={8} style={{ padding:'0 14px 16px 14px', borderBottom:'1px solid rgba(255,255,255,0.05)', background:'rgba(249,115,22,0.03)' }}>
                              <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(249,115,22,0.2)', borderRadius:10, padding:'16px', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:16 }}>
                                <div>
                                  <label style={{ color:'rgba(255,255,255,0.5)', fontSize:11, fontWeight:700, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:0.8 }}>
                                    H1 Header (Page Title displayed on site)
                                  </label>
                                  <input
                                    type="text"
                                    value={(get(entry,'college_name') as string)||''}
                                    onChange={e=>set(entry.id,'college_name',e.target.value||null)}
                                    placeholder="e.g. Top MBA Colleges in Coimbatore"
                                    style={{ ...inp(), fontSize:12 }}
                                  />
                                </div>
                                <div>
                                  <label style={{ color:'rgba(255,255,255,0.5)', fontSize:11, fontWeight:700, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:0.8 }}>
                                    Page Title Tag (&lt;title&gt;)
                                  </label>
                                  <input
                                    type="text"
                                    value={(get(entry,'seo_title') as string)||''}
                                    onChange={e=>set(entry.id,'seo_title',e.target.value||null)}
                                    placeholder="e.g. Top MBA Colleges in Coimbatore | Collegesera"
                                    style={{ ...inp(), fontSize:12 }}
                                  />
                                </div>
                                <div>
                                  <label style={{ color:'rgba(255,255,255,0.5)', fontSize:11, fontWeight:700, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:0.8 }}>
                                    Meta Keywords / Notes (strips "landing page")
                                  </label>
                                  <input
                                    type="text"
                                    value={(get(entry,'notes') as string)||''}
                                    onChange={e=>set(entry.id,'notes',e.target.value||null)}
                                    placeholder="top mba colleges coimbatore, mba admissions"
                                    style={{ ...inp(), fontSize:12 }}
                                  />
                                </div>
                                <div>
                                  <label style={{ color:'rgba(255,255,255,0.5)', fontSize:11, fontWeight:700, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:0.8 }}>
                                    Sitemap Changefreq
                                  </label>
                                  <select value={get(entry,'changefreq') as string} onChange={e=>set(entry.id,'changefreq',e.target.value)} style={{ ...sel, width:'100%', padding:'7px 10px' }}>
                                    {CHANGEFREQ_OPTIONS.map(f=><option key={f} value={f}>{f}</option>)}
                                  </select>
                                </div>
                                <div style={{ gridColumn:'1 / -1' }}>
                                  <label style={{ color:'rgba(255,255,255,0.5)', fontSize:11, fontWeight:700, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:0.8 }}>
                                    Meta Description
                                  </label>
                                  <textarea
                                    value={(get(entry,'seo_description') as string)||''}
                                    onChange={e=>set(entry.id,'seo_description',e.target.value||null)}
                                    placeholder="Compelling 150-160 character description for Google search results…"
                                    rows={2}
                                    style={{ ...inp(), fontSize:12, resize:'vertical' }}
                                  />
                                </div>
                                <div style={{ gridColumn:'1 / -1' }}>
                                  <label style={{ color:'rgba(255,255,255,0.5)', fontSize:11, fontWeight:700, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:0.8 }}>
                                    Social Sharing Image (OG / Twitter Image URL)
                                  </label>
                                  <input
                                    type="url"
                                    value={(get(entry,'og_image') as string)||''}
                                    onChange={e=>set(entry.id,'og_image',e.target.value||null)}
                                    placeholder="https://collegesera.com/og-image.png"
                                    style={{ ...inp(), fontSize:12 }}
                                  />
                                  {(get(entry,'og_image') as string) && (
                                    <img src={get(entry,'og_image') as string} alt="preview" style={{ marginTop:8, height:50, borderRadius:6, objectFit:'cover', border:'1px solid rgba(255,255,255,0.1)' }} onError={e=>{(e.target as HTMLImageElement).style.display='none'}} />
                                  )}
                                </div>
                                <div style={{ gridColumn:'1 / -1', display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:14, borderTop:'1px solid rgba(255,255,255,0.08)', marginTop:4 }}>
                                  <button
                                    type="button"
                                    onClick={()=>handleDelete(entry)}
                                    disabled={saving[entry.id]}
                                    style={{
                                      padding:'7px 14px',
                                      background:'rgba(239,68,68,0.12)',
                                      border:'1px solid rgba(239,68,68,0.3)',
                                      borderRadius:6,
                                      color:'#f87171',
                                      cursor:'pointer',
                                      fontSize:12,
                                      fontWeight:600,
                                      display:'inline-flex',
                                      alignItems:'center',
                                      gap:6
                                    }}
                                  >
                                    <span>🗑️</span>
                                    <span>Delete this Page</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={()=>saveRow(entry)}
                                    disabled={!d||saving[entry.id]}
                                    style={saveBtnStyle(d,!!saved[entry.id])}
                                  >
                                    {saving[entry.id]?'Saving…':saved[entry.id]?'✓ Saved':d?'Save Changes':'All Saved'}
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination */}
              {currentTotalPages>1 && (
                <div style={{ padding:'12px 16px', display:'flex', justifyContent:'center', alignItems:'center', gap:8, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                  <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{ padding:'5px 12px', borderRadius:6, border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'#fff', cursor:'pointer', fontSize:12, opacity:page===1?0.4:1 }}>← Prev</button>
                  <span style={{ fontSize:12, color:'rgba(255,255,255,0.5)' }}>Page {page} of {currentTotalPages}</span>
                  <button onClick={()=>setPage(p=>Math.min(currentTotalPages,p+1))} disabled={page===currentTotalPages} style={{ padding:'5px 12px', borderRadius:6, border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'#fff', cursor:'pointer', fontSize:12, opacity:page===currentTotalPages?0.4:1 }}>Next →</button>
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* Add / Edit Article Modal */}
      {showAddArticleModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', backdropFilter:'blur(6px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:16 }}>
          <div style={{ background:'#16162a', border:'1px solid rgba(255,255,255,0.15)', borderRadius:16, padding:28, width:720, maxWidth:'96vw', maxHeight:'90vh', overflowY:'auto', boxShadow:'0 20px 50px rgba(0,0,0,0.6)' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18, borderBottom:'1px solid rgba(255,255,255,0.08)', paddingBottom:14 }}>
              <div>
                <h3 style={{ margin:0, fontSize:19, fontWeight:700, color:'#fff' }}>
                  {editingArticle ? 'Edit Article' : 'Add New Article to /articles'}
                </h3>
                <p style={{ margin:'4px 0 0 0', fontSize:12, color:'rgba(255,255,255,0.45)' }}>
                  Published articles immediately appear live on the <a href="/articles" target="_blank" rel="noreferrer" style={{ color:'#60a5fa' }}>/articles</a> page
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setShowAddArticleModal(false); setEditingArticle(null); }}
                style={{ background:'rgba(255,255,255,0.08)', border:'none', borderRadius:8, width:32, height:32, color:'#fff', cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveArticle}>
              {/* Title */}
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.7)', textTransform:'uppercase', display:'block', marginBottom:5 }}>
                  Article Title *
                </label>
                <input
                  required
                  type="text"
                  value={articleTitle}
                  onChange={e => handleTitleChange(e.target.value)}
                  placeholder="e.g. NEET UG 2026: Application Process, Eligibility & Key Dates"
                  style={{ ...inp(), fontSize:13, padding:'10px 12px' }}
                />
              </div>

              {/* URL Slug */}
              <div style={{ marginBottom:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
                  <label style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.7)', textTransform:'uppercase' }}>
                    URL Slug *
                  </label>
                  {!editingArticle && (
                    <label style={{ fontSize:11, color:'rgba(255,255,255,0.5)', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                      <input
                        type="checkbox"
                        checked={autoSlug}
                        onChange={e => {
                          setAutoSlug(e.target.checked);
                          if (e.target.checked) setArticleSlug(generateSlug(articleTitle));
                        }}
                      />
                      Auto-generate from title
                    </label>
                  )}
                </div>
                <input
                  required
                  type="text"
                  value={articleSlug}
                  onChange={e => { setArticleSlug(e.target.value); setAutoSlug(false); }}
                  placeholder="e.g. neet-ug-2026-application-process"
                  style={{ ...inp(), fontSize:13, padding:'10px 12px' }}
                />
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginTop:4 }}>
                  Live URL: <code style={{ color:'#60a5fa' }}>https://collegesera.com/articles/{articleSlug || 'your-slug'}</code>
                </div>
              </div>

              {/* Category & Status */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:14, marginBottom:14 }}>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.7)', textTransform:'uppercase', display:'block', marginBottom:5 }}>
                    Category / Label (Filter Tab on /articles)
                  </label>
                  <select
                    value={articleLabel}
                    onChange={e => setArticleLabel(e.target.value)}
                    style={{ ...sel, width:'100%', padding:'9px 10px', fontSize:13 }}
                  >
                    <option value="Exam">Exam</option>
                    <option value="Colleges">Colleges</option>
                    <option value="Admissions">Admissions</option>
                    <option value="Courses">Courses</option>
                    <option value="Career">Career</option>
                    <option value="Guide">Guide</option>
                    <option value="News">News</option>
                    <option value="Scholarship">Scholarship</option>
                    <option value="Custom">Custom Label…</option>
                  </select>
                  {articleLabel === 'Custom' && (
                    <input
                      type="text"
                      value={customLabel}
                      onChange={e => setCustomLabel(e.target.value)}
                      placeholder="Type custom category name..."
                      style={{ ...inp(), marginTop:8, fontSize:12 }}
                    />
                  )}
                </div>

                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.7)', textTransform:'uppercase', display:'block', marginBottom:5 }}>
                    Visibility / Status
                  </label>
                  <select
                    value={articleStatus}
                    onChange={e => setArticleStatus(e.target.value as any)}
                    style={{ ...sel, width:'100%', padding:'9px 10px', fontSize:13 }}
                  >
                    <option value="published">🟢 Published (Live on /articles)</option>
                    <option value="draft">⚪ Draft (Hidden from public)</option>
                  </select>
                  <div style={{ fontSize:11, color: articleStatus === 'published' ? '#4ade80' : 'rgba(255,255,255,0.4)', marginTop:4 }}>
                    {articleStatus === 'published' ? '✓ Will immediately show up on the /articles page' : '⏸ Saved as draft, hidden from /articles'}
                  </div>
                </div>
              </div>

              {/* Featured toggle */}
              <div style={{ marginBottom:14, background:'rgba(255,255,255,0.03)', padding:'10px 14px', borderRadius:8, border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', gap:10 }}>
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={articleFeatured}
                  onChange={e => setArticleFeatured(e.target.checked)}
                  style={{ width:16, height:16, cursor:'pointer' }}
                />
                <label htmlFor="featuredToggle" style={{ fontSize:13, color:'#fff', cursor:'pointer', fontWeight:500 }}>
                  ⭐ Pin as Featured Article (Highlighted with badge &amp; featured placement on /articles)
                </label>
              </div>

              {/* Featured Image */}
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.7)', textTransform:'uppercase', display:'block', marginBottom:5 }}>
                  Featured Image Banner URL
                </label>
                <input
                  type="url"
                  value={articleFeaturedImage}
                  onChange={e => setArticleFeaturedImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  style={{ ...inp(), fontSize:12 }}
                />
                {articleFeaturedImage && (
                  <div style={{ marginTop:8, display:'flex', alignItems:'center', gap:10 }}>
                    <img
                      src={articleFeaturedImage}
                      alt="Banner Preview"
                      style={{ height:56, width:100, borderRadius:6, objectFit:'cover', border:'1px solid rgba(255,255,255,0.15)' }}
                      onError={e => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                    <span style={{ fontSize:11, color:'rgba(255,255,255,0.4)' }}>Image preview (shown on /articles card &amp; article page)</span>
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.7)', textTransform:'uppercase', display:'block', marginBottom:5 }}>
                  Excerpt / Summary (Card description on /articles)
                </label>
                <textarea
                  rows={2}
                  value={articleExcerpt}
                  onChange={e => setArticleExcerpt(e.target.value)}
                  placeholder="Brief 1-2 sentence overview shown on the /articles list..."
                  style={{ ...inp(), fontSize:12, resize:'vertical' }}
                />
              </div>

              {/* SEO Meta Description */}
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.7)', textTransform:'uppercase', display:'block', marginBottom:5 }}>
                  SEO Meta Description (Google Search Snippet)
                </label>
                <textarea
                  rows={2}
                  value={articleMetaDesc}
                  onChange={e => setArticleMetaDesc(e.target.value)}
                  placeholder="Compelling 150-160 character description for search engine ranking..."
                  style={{ ...inp(), fontSize:12, resize:'vertical' }}
                />
              </div>

              {/* Article Content */}
              <div style={{ marginBottom:18 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6, flexWrap:'wrap', gap:6 }}>
                  <label style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.7)', textTransform:'uppercase' }}>
                    Article Content (HTML / Rich Text) *
                  </label>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    <button
                      type="button"
                      onClick={() => setArticleContent(prev => prev + '\n<h2>Section Heading</h2>\n<p>Content for this section...</p>\n')}
                      style={{ fontSize:11, padding:'3px 8px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:4, color:'#e2e8f0', cursor:'pointer' }}
                    >
                      + H2 Heading
                    </button>
                    <button
                      type="button"
                      onClick={() => setArticleContent(prev => prev + '\n<h3>Subheading</h3>\n')}
                      style={{ fontSize:11, padding:'3px 8px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:4, color:'#e2e8f0', cursor:'pointer' }}
                    >
                      + H3
                    </button>
                    <button
                      type="button"
                      onClick={() => setArticleContent(prev => prev + '\n<ul>\n  <li>Key point 1</li>\n  <li>Key point 2</li>\n</ul>\n')}
                      style={{ fontSize:11, padding:'3px 8px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:4, color:'#e2e8f0', cursor:'pointer' }}
                    >
                      + Bullet List
                    </button>
                    <button
                      type="button"
                      onClick={() => setArticleContent(prev => prev + '\n<div style="padding:14px;background:#fff7ed;border-left:4px solid #ea580c;border-radius:6px;color:#9a3412;"><p><strong>Note:</strong> Important announcement or tip...</p></div>\n')}
                      style={{ fontSize:11, padding:'3px 8px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:4, color:'#e2e8f0', cursor:'pointer' }}
                    >
                      + Alert Box
                    </button>
                  </div>
                </div>
                <textarea
                  rows={9}
                  required
                  value={articleContent}
                  onChange={e => setArticleContent(e.target.value)}
                  placeholder="<p>Full article body with paragraphs and headings...</p>"
                  style={{ ...inp(), fontFamily:"'Fira Code', monospace, sans-serif", fontSize:12, lineHeight:1.5, resize:'vertical' }}
                />
              </div>

              {/* Buttons */}
              <div style={{ display:'flex', gap:10, justifyContent:'flex-end', paddingTop:14, borderTop:'1px solid rgba(255,255,255,0.08)' }}>
                <button
                  type="button"
                  onClick={() => { setShowAddArticleModal(false); setEditingArticle(null); }}
                  style={{ padding:'9px 18px', background:'transparent', border:'1px solid rgba(255,255,255,0.2)', borderRadius:8, color:'#fff', cursor:'pointer', fontSize:13 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={articleSubmitting}
                  style={{ padding:'9px 24px', background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', borderRadius:8, color:'#fff', fontWeight:600, cursor:'pointer', fontSize:13, opacity: articleSubmitting ? 0.7 : 1 }}
                >
                  {articleSubmitting ? 'Saving…' : editingArticle ? 'Save Changes' : (articleStatus === 'published' ? 'Publish to /articles' : 'Save Draft')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Landing Page Modal */}
      {showAddModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(5px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:999 }}>
          <div style={{ background:'#1a1a2e', border:'1px solid rgba(255,255,255,0.15)', borderRadius:16, padding:28, width:460, maxWidth:'90vw' }}>
            <h3 style={{ margin:'0 0 16px 0', fontSize:18, fontWeight:700, color:'#fff' }}>Add New SEO Landing Page</h3>
            <form onSubmit={handleAddLandingPage}>
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.6)', textTransform:'uppercase', display:'block', marginBottom:4 }}>URL Path (e.g. /top-mba-colleges-in-coimbatore)</label>
                <input required type="text" value={newLoc} onChange={e=>setNewLoc(e.target.value)} placeholder="/my-landing-page" style={inp()} />
              </div>
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.6)', textTransform:'uppercase', display:'block', marginBottom:4 }}>Page / H1 Header</label>
                <input type="text" value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Top Colleges..." style={inp()} />
              </div>
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.6)', textTransform:'uppercase', display:'block', marginBottom:4 }}>Page Title (&lt;title&gt;)</label>
                <input type="text" value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="Title | Collegesera" style={inp()} />
              </div>
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.6)', textTransform:'uppercase', display:'block', marginBottom:4 }}>Meta Description</label>
                <textarea rows={2} value={newDesc} onChange={e=>setNewDesc(e.target.value)} placeholder="Meta description..." style={inp()} />
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.6)', textTransform:'uppercase', display:'block', marginBottom:4 }}>Meta Keywords</label>
                <input type="text" value={newKeywords} onChange={e=>setNewKeywords(e.target.value)} placeholder="comma separated keywords" style={inp()} />
              </div>
              <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
                <button type="button" onClick={()=>setShowAddModal(false)} style={{ padding:'8px 14px', background:'transparent', border:'1px solid rgba(255,255,255,0.2)', borderRadius:8, color:'#fff', cursor:'pointer', fontSize:13 }}>Cancel</button>
                <button type="submit" style={{ padding:'8px 18px', background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', borderRadius:8, color:'#fff', fontWeight:600, cursor:'pointer', fontSize:13 }}>Create Page</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position:'fixed', bottom:24, right:24, background:'#1e1e3f', border:'1px solid rgba(249,115,22,0.4)', borderRadius:10, padding:'12px 20px', fontSize:14, color:'#e2e8f0', boxShadow:'0 8px 24px rgba(0,0,0,0.5)', zIndex:9999 }}>
          {toast}
        </div>
      )}
    </div>
  );
}

export default function SitemapAdmin() {
  const location = useLocation();
  const isInSecurePortal = location.pathname.startsWith('/secure-portal');
  const [loggedIn, setLoggedIn] = useState(() => isInSecurePortal || sessionStorage.getItem(SESSION_KEY)==='true');

  useEffect(() => {
    if (isInSecurePortal) {
      setLoggedIn(true);
    }
  }, [isInSecurePortal]);

  return loggedIn
    ? <Editor onLogout={() => { sessionStorage.removeItem(SESSION_KEY); setLoggedIn(false); }} />
    : <Login onLogin={() => setLoggedIn(true)} />;
}

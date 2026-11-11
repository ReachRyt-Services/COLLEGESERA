import { DatabaseCollege } from "@/types/database";

export const STOP_WORDS = new Set([
  "in", "at", "the", "of", "and", "for", "to", "by", "on", "with", "from", "a", "an", "top", "best", "list"
]);

export const GENERIC_INSTITUTION_WORDS = new Set([
  "college", "colleges", "institute", "institutes", "institution", "institutions",
  "university", "universities", "school", "schools", "academy", "campus",
  "autonomous", "deemed", "trust", "foundation", "educational"
]);

export const STREAM_WORDS = new Set([
  "engineering", "technology", "technical", "arts", "science", "sciences",
  "commerce", "management", "business", "mba", "pgdm", "medical", "paramedical",
  "health", "allied", "nursing", "pharmacy", "physiotherapy", "occupational",
  "therapy", "architecture", "agriculture", "law", "computer", "applications",
  "information", "studies", "research", "education", "higher", "liberal",
  "international", "national", "government", "govt", "private", "womens", "women"
]);

/**
 * Normalizes a string for college search matching.
 * Handles punctuation, ampersands, dotted initials (e.g. Dr. N.G.P., C.M.S.), and known DB typos.
 */
export function normalizeSearchText(str?: string | null): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/&/g, " and ")
    // Collapse dotted initials like "c.m.s." -> "cms", "n.g.p." -> "ngp"
    .replace(/\b([a-z])\.(?=\s*[a-z]\b|\s*[a-z]\.)/g, "$1")
    .replace(/\./g, "")
    // Normalize known DB typo "yechnology" -> "technology"
    .replace(/\byechnology\b/g, "technology")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Collapses consecutive single-letter tokens into a single acronym token
 * e.g. "c m s college" -> "cms college", "dr n g p institute" -> "dr ngp institute"
 */
export function collapseSingleLetters(normStr: string): string {
  if (!normStr) return "";
  const words = normStr.split(" ").filter(Boolean);
  const result: string[] = [];
  let buffer = "";
  for (const w of words) {
    if (w.length === 1 && /[a-z]/.test(w)) {
      buffer += w;
    } else {
      if (buffer) {
        result.push(buffer);
        buffer = "";
      }
      result.push(w);
    }
  }
  if (buffer) result.push(buffer);
  return result.join(" ");
}

/**
 * Generates an acronym from significant words of a college name
 * e.g. "Sri Krishna College of Engineering and Technology" -> "skcet"
 */
function generateAcronym(normName: string): string {
  if (!normName) return "";
  const ignore = new Set(["of", "and", "the", "for", "in", "to", "be", "at", "autonomous", "deemed"]);
  const words = normName.split(" ").filter(w => w.length > 0 && !ignore.has(w));
  if (words.length < 2) return "";
  return words.map(w => w[0]).join("");
}

interface IndexedCollege {
  college: any;
  normName: string;
  collapsedName: string;
  normSlug: string;
  collapsedSlug: string;
  acronym: string;
  normLocation: string;
  normDistrict: string;
  normAddress: string;
  normType: string;
  normCourses: string;
  nameSlugText: string;
  nameSlugWords: string[];
  primaryText: string;
  primaryWords: string[];
  fullText: string;
  fullWords: string[];
}

const indexCache = new WeakMap<any[], IndexedCollege[]>();

function getIndexedColleges(colleges: any[]): IndexedCollege[] {
  if (!colleges || colleges.length === 0) return [];
  const cached = indexCache.get(colleges);
  if (cached) return cached;

  const indexed: IndexedCollege[] = colleges.map(college => {
    const normName = normalizeSearchText(college.name);
    const collapsedName = collapseSingleLetters(normName);
    const cleanRawSlug = (college.slug || "").replace(/^\d+-/, "");
    const normSlug = normalizeSearchText(cleanRawSlug);
    const collapsedSlug = collapseSingleLetters(normSlug);
    const acronym = generateAcronym(normName);
    const normLocation = normalizeSearchText(college.location);
    const normDistrict = normalizeSearchText(college.district);
    const normAddress = normalizeSearchText(college.address);
    const normType = normalizeSearchText(`${college.type || ""} ${college.type_collwge || ""}`);
    const normCourses = normalizeSearchText(
      Array.isArray(college.courses)
        ? college.courses.map((cr: any) => `${cr?.name || ""} ${cr?.specialization || ""}`).join(" ")
        : ""
    );

    const nameSlugText = `${normName} ${collapsedName} ${normSlug} ${collapsedSlug} ${acronym}`.trim();
    const nameSlugWords = Array.from(new Set(nameSlugText.split(" ").filter(Boolean)));

    const primaryText = `${nameSlugText} ${normLocation} ${normDistrict} ${normAddress} ${normType}`.trim();
    const primaryWords = Array.from(new Set(primaryText.split(" ").filter(Boolean)));

    const fullText = `${primaryText} ${normCourses}`.trim();
    const fullWords = Array.from(new Set(fullText.split(" ").filter(Boolean)));

    return {
      college,
      normName,
      collapsedName,
      normSlug,
      collapsedSlug,
      acronym,
      normLocation,
      normDistrict,
      normAddress,
      normType,
      normCourses,
      nameSlugText,
      nameSlugWords,
      primaryText,
      primaryWords,
      fullText,
      fullWords,
    };
  });

  indexCache.set(colleges, indexed);
  return indexed;
}

function tokenMatchesWords(token: string, words: string[], text: string): boolean {
  if (!token) return false;
  if (token.length === 1) {
    return words.some(w => w.startsWith(token));
  }
  return words.some(w => w.startsWith(token) || w.includes(token)) || text.includes(token);
}

function tokenMatchesNameSlug(token: string, ic: IndexedCollege): boolean {
  return tokenMatchesWords(token, ic.nameSlugWords, ic.nameSlugText);
}

function tokenMatchesPrimary(token: string, ic: IndexedCollege): boolean {
  if (tokenMatchesWords(token, ic.primaryWords, ic.primaryText)) return true;
  if (token === "mba" || token === "management") {
    return (
      ic.primaryWords.some(w => w === "mba" || w === "pgdm" || w.startsWith("manage") || w.startsWith("business")) ||
      ic.fullWords.some(w => w === "mba" || w === "pgdm")
    );
  }
  if (token === "engineering") {
    return ic.primaryWords.some(w => w.startsWith("engineer") || w.startsWith("technolog") || w.startsWith("technical"));
  }
  if (token === "paramedical") {
    return ic.primaryWords.some(
      w =>
        w.startsWith("paramed") ||
        w.startsWith("allied") ||
        w.startsWith("nursing") ||
        w.startsWith("physiotherap") ||
        w.startsWith("occupational") ||
        w.startsWith("health")
    );
  }
  return false;
}

function tokenMatchesFull(token: string, ic: IndexedCollege): boolean {
  if (tokenMatchesPrimary(token, ic)) return true;
  return tokenMatchesWords(token, ic.fullWords, ic.fullText);
}

function filterPoolByToken(pool: IndexedCollege[], token: string): IndexedCollege[] {
  const nameMatches = pool.filter(ic => tokenMatchesNameSlug(token, ic));
  if (nameMatches.length > 0) return nameMatches;

  const primaryMatches = pool.filter(ic => tokenMatchesPrimary(token, ic));
  if (primaryMatches.length > 0) return primaryMatches;

  return pool.filter(ic => tokenMatchesFull(token, ic));
}

function scoreCollegeMatch(
  ic: IndexedCollege,
  normQuery: string,
  collapsedQuery: string,
  rawTokens: string[],
  matchedTokens: string[]
): number {
  let score = 0;

  // 1. Exact or prefix match on full normalized / collapsed name
  if (ic.normName === normQuery || ic.collapsedName === collapsedQuery || ic.normSlug === normQuery) {
    score += 10000;
  } else if (
    ic.normName.startsWith(normQuery) ||
    ic.collapsedName.startsWith(collapsedQuery) ||
    ic.normSlug.startsWith(normQuery)
  ) {
    score += 5000;
  } else if (
    normQuery.length >= 2 &&
    (ic.normName.includes(normQuery) ||
      ic.collapsedName.includes(collapsedQuery) ||
      ic.normSlug.includes(normQuery))
  ) {
    score += 3000;
  }

  // 2. First token matches start of college name or acronym
  const firstToken = matchedTokens[0] || rawTokens[0];
  if (firstToken) {
    if (
      ic.normName.startsWith(firstToken) ||
      ic.collapsedName.startsWith(firstToken) ||
      ic.acronym === firstToken
    ) {
      score += 600;
    }
  }

  // 3. Last matching token bonus (prioritize colleges matching the latest keyword typed)
  const lastToken = matchedTokens[matchedTokens.length - 1];
  if (lastToken) {
    if (tokenMatchesNameSlug(lastToken, ic)) {
      score += 400;
    } else if (tokenMatchesPrimary(lastToken, ic)) {
      score += 200;
    }
  }

  // 4. Score per token in rawTokens
  for (const token of rawTokens) {
    if (ic.nameSlugWords.some(w => w === token)) {
      score += 350;
    } else if (ic.nameSlugWords.some(w => w.startsWith(token))) {
      score += 250;
    } else if (tokenMatchesNameSlug(token, ic)) {
      score += 180;
    } else if (tokenMatchesPrimary(token, ic)) {
      score += 100;
    } else if (tokenMatchesFull(token, ic)) {
      score += 50;
    }
  }

  // 5. Tie-breaker: shorter name difference & featured priority
  if (ic.college.featured) score += 10;
  if (ic.college.featured_priority) score += Math.min(ic.college.featured_priority * 0.05, 9);

  return score;
}

export interface CollegeSearchMatchResult {
  matchedColleges: DatabaseCollege[];
  effectiveQuery: string;
  matchedTokens: string[];
}

/**
 * Matches colleges letter-by-letter and word-by-word.
 * If the user types additional words that don't match together with earlier words,
 * falls back to the colleges matching up to the last matching keyword in the search input.
 */
export function findMatchingColleges(
  colleges: any[],
  rawQuery: string
): CollegeSearchMatchResult {
  const indexed = getIndexedColleges(colleges);
  const normQuery = normalizeSearchText(rawQuery);
  const collapsedQuery = collapseSingleLetters(normQuery);

  if (!normQuery || indexed.length === 0) {
    return { matchedColleges: [], effectiveQuery: "", matchedTokens: [] };
  }

  // Use collapsed tokens if consecutive single letters exist and match, otherwise normQuery tokens
  const normTokens = normQuery.split(" ").filter(Boolean);
  const collapsedTokens = collapsedQuery.split(" ").filter(Boolean);
  const useCollapsed =
    collapsedTokens.length < normTokens.length &&
    indexed.some(ic => collapsedTokens.every(t => tokenMatchesPrimary(t, ic)));
  const rawTokens = useCollapsed ? collapsedTokens : normTokens;
  const nonStopTokens = rawTokens.filter(t => !STOP_WORDS.has(t));
  const queryTokens = nonStopTokens.length > 0 ? nonStopTokens : rawTokens;

  // Step 1: Check if all queryTokens match together in name/slug, primary, or full text
  let matchedPool: IndexedCollege[] = [];
  let matchedTokens: string[] = [];

  const allNameMatches = indexed.filter(ic => queryTokens.every(t => tokenMatchesNameSlug(t, ic)));
  if (allNameMatches.length > 0) {
    matchedPool = allNameMatches;
    matchedTokens = queryTokens;
  } else {
    const allPrimaryMatches = indexed.filter(ic => queryTokens.every(t => tokenMatchesPrimary(t, ic)));
    if (allPrimaryMatches.length > 0) {
      matchedPool = allPrimaryMatches;
      matchedTokens = queryTokens;
    } else {
      const allFullMatches = indexed.filter(ic => queryTokens.every(t => tokenMatchesFull(t, ic)));
      if (allFullMatches.length > 0) {
        matchedPool = allFullMatches;
        matchedTokens = queryTokens;
      }
    }
  }

  // Step 2: If no college matches all queryTokens together, try relaxing generic institution words
  // (e.g. "Amrita University" -> "amrita", "VIT University" -> "vit", "PSG College of Technology" -> "psg" + "technology")
  if (matchedPool.length === 0) {
    const specificTokens = queryTokens.filter(t => !GENERIC_INSTITUTION_WORDS.has(t));
    if (specificTokens.length > 0 && specificTokens.length < queryTokens.length) {
      const specNameMatches = indexed.filter(ic => specificTokens.every(t => tokenMatchesNameSlug(t, ic)));
      if (specNameMatches.length > 0) {
        matchedPool = specNameMatches;
        matchedTokens = specificTokens;
      } else {
        const specPrimaryMatches = indexed.filter(ic => specificTokens.every(t => tokenMatchesPrimary(t, ic)));
        if (specPrimaryMatches.length > 0) {
          matchedPool = specPrimaryMatches;
          matchedTokens = specificTokens;
        } else {
          const specFullMatches = indexed.filter(ic => specificTokens.every(t => tokenMatchesFull(t, ic)));
          if (specFullMatches.length > 0) {
            matchedPool = specFullMatches;
            matchedTokens = specificTokens;
          }
        }
      }
    }
  }

  // Step 3: Progressive word-by-word accumulation & last matching keyword fallback
  if (matchedPool.length === 0) {
    let pool = indexed;
    const acceptedTokens: string[] = [];
    let brandPool: IndexedCollege[] | null = null;
    const brandTokens: string[] = [];

    for (const token of queryTokens) {
      const nextPool = filterPoolByToken(pool, token);
      if (nextPool.length > 0) {
        pool = nextPool;
        acceptedTokens.push(token);
        if (!GENERIC_INSTITUTION_WORDS.has(token) && !STREAM_WORDS.has(token)) {
          brandTokens.push(token);
          brandPool = pool;
        }
      } else {
        // Check if token matches within the brand anchor pool (e.g. "PSG" + "Technology" when "College" narrowed to Arts & Science)
        if (brandPool && brandPool.length > 0 && !GENERIC_INSTITUTION_WORDS.has(token)) {
          const brandPlusToken = filterPoolByToken(brandPool, token);
          if (brandPlusToken.length > 0) {
            // Combine brandPlusToken with current pool so both appear, with brandPlusToken ranked higher
            const seenIds = new Set(brandPlusToken.map(ic => ic.college.id || ic.college.slug || ic.college.name));
            const combined = [...brandPlusToken];
            for (const item of pool) {
              const key = item.college.id || item.college.slug || item.college.name;
              if (!seenIds.has(key)) {
                seenIds.add(key);
                combined.push(item);
              }
            }
            pool = combined;
            acceptedTokens.push(token);
            continue;
          }
        }

        // Check if a prefix of `token` (while user is typing letter by letter) matches within `pool`
        if (acceptedTokens.length > 0 && token.length >= 2) {
          let prefixMatched = false;
          for (let len = token.length - 1; len >= 2; len--) {
            const sub = token.slice(0, len);
            const subPool = filterPoolByToken(pool, sub);
            if (subPool.length > 0) {
              pool = subPool;
              acceptedTokens.push(sub);
              prefixMatched = true;
              break;
            }
          }
          if (prefixMatched) continue;
        }
      }
    }

    if (acceptedTokens.length > 0) {
      matchedPool = pool;
      matchedTokens = acceptedTokens;
    } else {
      // Fallback: check individual tokens from the last token backwards to find the last matching keyword
      for (let i = queryTokens.length - 1; i >= 0; i--) {
        const t = queryTokens[i];
        const singleMatches = filterPoolByToken(indexed, t);
        if (singleMatches.length > 0) {
          matchedPool = singleMatches;
          matchedTokens = [t];
          break;
        }
        // Also check prefix of `t` down to 2 chars
        for (let len = t.length - 1; len >= 2; len--) {
          const sub = t.slice(0, len);
          const subMatches = filterPoolByToken(indexed, sub);
          if (subMatches.length > 0) {
            matchedPool = subMatches;
            matchedTokens = [sub];
            break;
          }
        }
        if (matchedPool.length > 0) break;
      }
    }
  }

  if (matchedPool.length === 0) {
    return { matchedColleges: [], effectiveQuery: "", matchedTokens: [] };
  }

  // Deduplicate and sort by relevance score
  const seen = new Set<string>();
  const scored: { college: DatabaseCollege; score: number }[] = [];

  for (const ic of matchedPool) {
    const key = ic.college.slug || ic.college.id || ic.college.name;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    scored.push({
      college: ic.college,
      score: scoreCollegeMatch(ic, normQuery, collapsedQuery, rawTokens, matchedTokens),
    });
  }

  scored.sort((a, b) => b.score - a.score);

  return {
    matchedColleges: scored.map(s => s.college),
    effectiveQuery: matchedTokens.join(" "),
    matchedTokens,
  };
}

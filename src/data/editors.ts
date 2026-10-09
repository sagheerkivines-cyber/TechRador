import { Author } from '../types';

export const EDITORS: Author[] = [
  {
    id: 'aris-thorne',
    name: 'Dr. Aris Thorne',
    role: 'Editor-in-Chief & Silicon Architecture Fellow',
    institution: 'Former ASML Advanced Research / Stanford VLSI Lab',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Dr. Thorne has published 38 papers on lithography tolerance, interconnect resistivity, and heterogeneous 3D packaging. At TechRador, he oversees physical silicon benchmarks and wafer test methodology.',
    twitter: '@aris_thorne',
    github: 'aris-thorne'
  },
  {
    id: 'elena-vance',
    name: 'Dr. Elena Vance',
    role: 'Principal Hardware & Silicon Editor',
    institution: 'TechRador Silicon Characterization Lab',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Pioneered interconnect topology research for multi-chiplet accelerator dies. She leads reviews on high-bandwidth memory (HBM4), CoWoS scaling, and RISC-V RVV pipelines.',
    twitter: '@evance_silicon',
    github: 'elenavance'
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    role: 'Senior Systems & Cloud Infrastructure Editor',
    institution: 'Linux Foundation Member / ex-Datacenter Schedulers Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Active Linux kernel contributor specializing in eBPF scheduler hooks, NUMA-aware memory tiering, and low-latency network telemetry.',
    twitter: '@marcuschen_sys',
    github: 'mchen-kernel'
  },
  {
    id: 'soraya-kournikova',
    name: 'Soraya Kournikova',
    role: 'Lead Cryptography & Cybersecurity Editor',
    institution: 'Center for Post-Quantum Systems & Verifiable Enclaves',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Focuses on lattice-based cryptography (ML-KEM, Dilithium), hardware side-channel mitigations, and attestation protocols in AMD SEV-SNP and Intel TDX.',
    twitter: '@sorayak_pqc',
    github: 'skournikova'
  },
  {
    id: 'devashish-rao',
    name: 'Devashish Rao',
    role: 'Distributed Systems & Compilers Fellow',
    institution: 'MIT CSAIL Alumni / TechRador Distributed Systems Group',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Specialist in TLA+ state machine verification, consensus algorithms under asymmetric network partitions, and disaggregated CXL memory routing.',
    twitter: '@drao_distrib',
    github: 'devashish-rao'
  },
  {
    id: 'linnea-lindqvist',
    name: 'Linnea Lindqvist',
    role: 'Machine Learning Systems & Runtime Editor',
    institution: 'Nordic AI Systems Institute / ex-Inference Runtimes Architect',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a171ed2bb734?auto=format&fit=crop&w=400&q=80',
    bio: 'Researches tensor compiler backends, speculative decoding latency envelopes, and FP4 quantization sensitivity across trillion-token validation sets.',
    twitter: '@linnea_ll',
    github: 'llindqvist'
  }
];

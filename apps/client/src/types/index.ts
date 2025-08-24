// ====== Quote Types ======
export interface PersonalInfo {
    name: string;
    phone: string;
    email: string;
    address: string;
}

export interface ProjectDetails {
    workType: 'new-project' | 'flooring' | 'painting' | 'bathroom' | 'kitchen' | 'maintenance' | 'other';
    area: string;
    rooms: string;
    description: string;
    urgency: 'low' | 'normal' | 'high';
    budget: 'low' | 'medium' | 'high';
}

export interface QuoteFormData {
    personalInfo: PersonalInfo;
    projectDetails: ProjectDetails;
    specificDetails: Record<string, any>;
}

export interface Quote {
    _id: string;
    quoteNumber: string;
    personalInfo: PersonalInfo;
    projectDetails: ProjectDetails;
    specificDetails: Record<string, any>;
    deliveryMethod: 'email' | 'whatsapp';
    estimatedPrice: number;
    finalPrice?: number;
    status: 'pending' | 'sent' | 'reviewed' | 'accepted' | 'rejected' | 'completed';
    notes?: string;
    createdAt: string;
    updatedAt: string;
    sentAt?: string;
    reviewedAt?: string;
    assignedTo?: string;
    history: Array<{
        action: string;
        description: string;
        timestamp: string;
        user?: string;
    }>;
    tags?: string[];
    priority: 'low' | 'medium' | 'high' | 'urgent';
    source: 'website' | 'phone' | 'referral' | 'social' | 'other';
}

// ====== Contact Types ======
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject?: string;
    message: string;
}

// ====== Customer Types ======
export interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address?: {
        street?: string;
        city?: string;
        zipCode?: string;
        country?: string;
    };
    status: 'active' | 'inactive' | 'prospect' | 'lead';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    source: 'website' | 'referral' | 'social_media' | 'advertisement' | 'cold_call' | 'other';
    notes?: string;
    tags?: string[];
    totalProjects: number;
    totalValue: number;
    lastContact: string;
    nextFollowUp?: string;
    assignedTo?: string;
    customFields?: Map<string, string>;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

// ====== Project Types ======
export interface Project {
    _id: string;
    name: string;
    description?: string;
    customer: string;
    status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    type: 'residential' | 'commercial' | 'hotel' | 'interior' | 'renovation' | 'other';
    budget: {
        estimated: number;
        actual: number;
        currency: string;
    };
    timeline: {
        startDate: string;
        endDate: string;
        actualStartDate?: string;
        actualEndDate?: string;
    };
    progress: number;
    location?: {
        address?: string;
        city?: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    team?: Array<{
        user: string;
        role: 'architect' | 'designer' | 'project_manager' | 'consultant' | 'other';
        assignedDate: string;
    }>;
    milestones?: Array<{
        title: string;
        description: string;
        dueDate: string;
        completed: boolean;
        completedDate?: string;
    }>;
    notes?: Array<{
        content: string;
        author: string;
        createdAt: string;
    }>;
    attachments?: Array<{
        filename: string;
        url: string;
        uploadedAt: string;
    }>;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

// ====== Lead Types ======
export interface Lead {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    source: 'website' | 'referral' | 'social_media' | 'advertisement' | 'cold_call' | 'exhibition' | 'other';
    status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'won' | 'lost';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    project: {
        type: 'residential' | 'commercial' | 'hotel' | 'interior' | 'renovation' | 'other';
        description?: string;
        budget?: {
            min: number;
            max: number;
            currency: string;
        };
        timeline?: {
            startDate: string;
            endDate: string;
        };
        location?: {
            address?: string;
            city?: string;
        };
    };
    notes?: Array<{
        content: string;
        author: string;
        createdAt: string;
    }>;
    activities?: Array<{
        type: 'call' | 'email' | 'meeting' | 'proposal' | 'follow_up';
        description: string;
        date: string;
        outcome?: string;
    }>;
    nextFollowUp?: string;
    assignedTo?: string;
    tags?: string[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

// ====== API Response Types ======
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

// ====== Event Types ======
export interface FormEvent {
    target: {
        value: string;
        name?: string;
    };
}

export interface SelectChangeEvent {
    target: {
        value: string | number;
    };
}

// ====== Component Props Types ======
export interface BaseComponentProps {
    className?: string;
    children?: React.ReactNode;
}

export interface FormSectionProps {
    section: keyof QuoteFormData;
    field: string;
    value: any;
    onChange: (section: keyof QuoteFormData, field: string, value: any) => void;
}

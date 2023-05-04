import { type PaymentCurrency } from '../js/modules/payment/payment-types.flow'

export type AlertLanguage = {
    code: string
    name: string
    order: number
}

export type AlertShareRole = {
    name: string
}

export type AlertSourceType =
    | 'blogs'
    | 'facebook'
    | 'facebook_keyword'
    | 'forums'
    | 'historical'
    | 'instagram'
    | 'linkedin'
    | 'news'
    | 'pinterest'
    | 'radio'
    | 'reviews'
    | 'tiktok'
    | 'tv'
    | 'twitter'
    | 'videos'
    | 'web'
    | 'youtube'
    | 'instant-mentions-checkmark-green-bg'

export type AlertSource = {
    code: AlertSourceType
    filter_by?: string
    hidden: boolean
    icons: {
        [nxnSize: string]: string
    }
    name: string
    order: number
}

export type AlertToneCode = -1 | 0 | 1

export type AlertTone = {
    code: 'neutral' | 'negative' | 'positive'
    name: string
}

/* Type created for mobile feed
AlertTone type and its usages are not consistent in current code
Code should be refactorized - exemple in `components/alert-panel/mention/MentionToneButton.jsx`
*/
export type MentionTone = {
    value: -1 | 0 | 1
    code: 'neutral' | 'negative' | 'positive'
    label: string
}

export type AppLanguage = {
    name: string
}

export type ChurnReason = {
    action: string
    code: string
    text: string
}

export type Country = {
    name: string
    code: string
    isEU: boolean
    paymentCurrency: PaymentCurrency
    vatCode: string
    vatRate?: number
}

export type DashboardThemeData = {
    code: string
    major_color: string
    minor_color: string
    name: string
}

export type EmailUnsubscribeGroup = {
    code: string
    front_message: string
}

export type FolderCode = 'inbox' | 'archive' | 'trash' | 'spam'

export type Folder = DisplayableFolder | HiddenFolder

export type DisplayableFolder = {
    code: FolderCode
    hidden: false
    name: string
}

export type HiddenFolder = {
    code: 'void'
    hidden: true
    name: string
}

export type Gender = {
    code: GenderCode
    name: string
}

export type GenderCode = 'female' | 'male'

export type ImportantReason = {
    reason: string
}

export type JobPositionsChoice = {
    code: string
    text: string
}

export type MentionLogType = {
    name: string
}

export type NotificationFrequency = {
    name: string
    enabled: boolean
    order: number
}

export type SocialAccountType = {
    name: string
}

export type StatsInterval = {
    code: string
    name: string
}

export type TaskType = {
    name: string
    enabled: boolean
}

export type EngagementCode = 'replies' | 'retweets' | 'quotes' | 'likes'

export type FollowerCode = 'followers' | 'following'

export type WeekdayCode = 1 | 2 | 3 | 4 | 5 | 6 | 7

export type Weekday = {
    code: WeekdayCode
    name: string
    abbr: string
}

export type MentionData = {
    config: {
        clientData: {
            client_id: string
            client_no_so_secret: string
            token_endpoint: string
        }
        conf: {
            facebook: {
                appId: string
            }
            segment: {
                write_key: string
                block: boolean
            }
            zapier: {
                demoRequestEndpoint: string
            }
        }
        hub_url_go: string
        favatar_api_key: string
        favatar_endpoint: string
        favatar2_endpoint: string
        favatar2_secret: string
        giphy_api_key: string
        forced_gohub_users: string[]
        gohub_coverage_denominator: number
        mproxy_url: string
        mproxy_enabled: boolean
        vat_country_code: string
    }
    flags: {
        ios_inapp_purchase_enabled: boolean
    }
    site_profile: {
        dlname: string
        domain: string
        facebook_url: string
        press_url: string
        sitename: string
        twitter_url: string
        twitter_screen_name: string
    }
    globally_enabled_features: string[]
    app_languages: {
        [code: string]: AppLanguage
    }
    alert_languages: {
        [code: string]: AlertLanguage
    }
    alert_countries: {
        [code: string]: string
    }
    alert_tones: {
        [code in AlertToneCode]: AlertTone
    }
    alert_sources: {
        [code in AlertSourceType]: AlertSource
    }
    alert_sub_sources: any[]
    alert_share_roles: {
        [code: string]: AlertShareRole
    }
    alert_colors: string[]
    churn_reasons: ChurnReason[]
    company_size_choices: {
        [x: string]: string
    }
    countries: {
        [code: string]: Country
    }
    dashboard_themes: DashboardThemeData[]
    email_unsubscribe_groups: EmailUnsubscribeGroup[]
    genders: {
        female: Gender
        male: Gender
    }
    important_reasons: {
        [code: string]: ImportantReason
    }
    job_positions_choices: JobPositionsChoice[]
    locale: string
    mention_folders: {
        [code: string]: Folder
    }
    mention_log_types: {
        [code: string]: MentionLogType
    }
    onboarding: {
        signup: {
            industries: {
                id: number
                code: string
                text: string
            }[]
            job_titles: {
                id: number
                code: string
                text: string
            }[]
            services: {
                id: number
                code: string
                text: string
            }[]
            use_cases: {
                id: number
                code: string
                text: string
            }[]
        }
    }
    stats_intervals: StatsInterval[]
    task_types: {
        [code: string]: TaskType
    }
    social_account_types: {
        [code: string]: SocialAccountType
    }
    version: string
    week_days: {
        [dayNumber in WeekdayCode]: Weekday
    }
    desktop_notification_frequencies: {
        [code: string]: NotificationFrequency
    }
    email_notification_frequencies: {
        [code: string]: NotificationFrequency
    }
    trending_email_notification_frequencies: {
        [code: string]: NotificationFrequency
    }
    trending_sms_notification_frequencies: {
        [code: string]: NotificationFrequency
    }
}
